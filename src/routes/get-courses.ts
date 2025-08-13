import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  await server.get(
    '/courses',
    {
      schema: {
        tags: ['courses'],
        summary: 'Get all courses',
        response: {
          200: z.object({
            courses: z
              .array(
                z.object({
                  id: z.uuid(),
                  title: z.string(),
                })
              )
              .describe('List of courses'),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await db
        .select({
          id: schema.courses.id,
          title: schema.courses.title,
        })
        .from(schema.courses)

      return reply.send({ courses: result })
    }
  )
}
