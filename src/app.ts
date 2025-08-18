import fastifySwagger from '@fastify/swagger'
import fastifyApiReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createCoursesRoute } from './routes/create-courses.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import { getCoursesByIdRoute } from './routes/get-courses-by-id.ts'

const server = fastify({
  logger:
    process.env.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : false,
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio NodeJS',
        version: '1.0',
      },
    },

    transform: jsonSchemaTransform,
  })

  server.register(fastifyApiReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'kepler',
    },
  })
}

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(getCoursesRoute)
server.register(getCoursesByIdRoute)
server.register(createCoursesRoute)

export { server as api }
