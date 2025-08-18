import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { beforeEach, expect, test } from 'vitest'
import { api } from '../app.ts'
import { makeCourses } from '../tests/factories/make-courses.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'

beforeEach(async () => {
  await api.ready()
})

test('Get course by id', async () => {
  const course = await makeCourses()
  const { token } = await makeAuthenticatedUser('student')

  const response = await request(api.server)
    .get(`/courses/${course.id}`)
    .set('Authorization', token)

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  })
})

test('Returns 404 when course does not exist', async () => {
  const { token } = await makeAuthenticatedUser('student')

  const response = await request(api.server)
    .get(`/courses/${randomUUID()}`)
    .set('Authorization', token)

  expect(response.status).toBe(404)
})
