import { and, asc, count, eq, ilike, type SQL } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { checkRequestJwt } from './hooks/check-request-jwt.ts'
import { checkUserRole } from './hooks/check-user-role.ts'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  await server.get(
    '/courses',
    {
      preHandler: [checkRequestJwt(), checkUserRole('manager')],
      schema: {
        tags: ['courses'],
        summary: 'Get all courses',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          search: z
            .string()
            .optional()
            .describe('Search term for course titles'),
          orderBy: z
            .enum(['id', 'title'])
            .optional()
            .default('id')
            .describe('Order by field'),
          page: z.coerce.number().optional().default(1).describe('Page number'),
        }),
        response: {
          200: z.object({
            courses: z
              .array(
                z.object({
                  id: z.uuid(),
                  title: z.string(),
                  enrollmentsCount: z
                    .number()
                    .describe('Number of enrollments'),
                })
              )
              .describe('List of courses'),
            total: z.number().describe('Total number of courses'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query

      const conditions: SQL[] | undefined = []

      if (search) {
        conditions.push(ilike(schema.courses.title, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: schema.courses.id,
            title: schema.courses.title,
            enrollmentsCount: count(schema.enrollments.id).as(
              'enrollments_count'
            ),
          })
          .from(schema.courses)
          .leftJoin(
            schema.enrollments,
            eq(schema.enrollments.courseId, schema.courses.id)
          )
          .orderBy(asc(schema.courses[orderBy]))
          .offset((page - 1) * 2)
          .limit(10)
          .where(and(...conditions))
          .groupBy(schema.courses.id),
        db.$count(schema.courses, and(...conditions)),
      ])

      return reply.send({ courses: result, total })
    }
  )
}
