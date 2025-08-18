import { api } from './app.ts'

api.listen({ host: '0.0.0.0', port: 1337 }).then(() => {
  api.log.info('🚀 HTTP server running!')
})
