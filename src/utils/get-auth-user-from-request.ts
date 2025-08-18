import type { FastifyRequest } from 'fastify'

export function getAuthUserFromRequest(request: FastifyRequest) {
  const user = request.users
  if (!user) {
    throw new Error('Invalid authenticated')
  }

  return user
}
