import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { expect, test } from 'vitest'
import { api } from '../app.ts'
import { makeCourses } from '../tests/factories/make-courses.ts'

test('Get course by id', async () => {
  api.ready()

  const course = await makeCourses()

  const response = await request(api.server).get(`/courses/${course.id}`)

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
  api.ready()

  const response = await request(api.server).get(`/courses/${randomUUID()}`)

  expect(response.status).toBe(404)
})
