import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import { getAuthUserFromRequest } from '../../utils/get-auth-user-from-request.ts'

export function checkUserRole(role: 'student' | 'manager') {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    const user = getAuthUserFromRequest(request)

    if (user?.role !== role) {
      return reply.status(403).send({ message: 'Insufficient permissions' })
    }
    done()
  }
}
