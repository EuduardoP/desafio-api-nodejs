import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    users?: {
      sub: string
      role: 'student' | 'manager'
    }
  }
}
