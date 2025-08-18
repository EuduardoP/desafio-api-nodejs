import { verify } from 'argon2'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import jwt from 'jsonwebtoken'
import z from 'zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  await server.post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Login',
        body: z.object({
          email: z.email('Email inválido'),
          password: z
            .string()
            .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const result = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))

      if (result.length === 0) {
        return reply.status(400).send({ message: 'Invalid credentials' })
      }

      const user = result[0]

      const doesPasswordMatch = await verify(user.password, password)

      if (!doesPasswordMatch) {
        return reply.status(400).send({ message: 'Invalid credentials' })
      }

      const token = jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_SECRET as string
      )

      return reply.status(200).send({ token })
    }
  )
}
