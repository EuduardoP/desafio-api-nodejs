import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import jwt from 'jsonwebtoken'

type JWTPayload = {
  sub: string
  role: 'student' | 'manager'
}

export function checkRequestJwt() {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({ message: 'Missing authorization token' })
    }

    // Verifica se o header está no formato "Bearer {token}"
    if (!authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ message: 'Invalid authorization format' })
    }

    const token = authHeader.substring(7)

    if (!token) {
      return reply.status(401).send({ message: 'Missing token' })
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload

      request.users = payload
    } catch (error) {
      return reply
        .status(401)
        .send({ message: 'Invalid authorization token', error })
    } finally {
      done()
    }
  }
}
