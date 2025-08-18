import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
  await server.get(
    '/courses/:id',
    {
      schema: {
        tags: ['courses'],
        summary: 'Get course by ID',
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null().describe('Course not found'),
        },
      },
    },
    async (request, reply) => {
      const courseId = request.params.id

      const result = await db
        .select()
        .from(schema.courses)
        .where(eq(schema.courses.id, courseId))

      if (result.length > 0) {
        return { course: result[0] }
      }

      return reply.status(404).send()
    }
  )
}
