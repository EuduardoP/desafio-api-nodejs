import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  await server.post(
    '/courses',
    {
      schema: {
        tags: ['courses'],
        summary: 'Create a course',
        body: z.object({
          title: z.string().min(5, 'Título precisa ter 5 caracteres'),
        }),
        response: {
          201: z.object({
            courseId: z.uuid().describe("course created's id"),
          }),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title

      const result = await db
        .insert(schema.courses)
        .values({
          title: courseTitle,
        })
        .returning()

      return reply.status(201).send({ courseId: result[0].id })
    }
  )
}
