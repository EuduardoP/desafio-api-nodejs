import { fakerPT_BR as faker } from '@faker-js/faker'
import request from 'supertest'
import { expect, test } from 'vitest'
import { api } from '../app.ts'

test('Create a course', async () => {
  api.ready()

  const response = await request(api.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .send({
      title: faker.lorem.words(4),
      description: faker.lorem.paragraph(),
    })

  expect(response.status).toBe(201)
  expect(response.body).toEqual({
    courseId: expect.any(String),
  })
})
