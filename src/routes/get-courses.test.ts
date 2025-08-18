import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { expect, test } from 'vitest'
import { api } from '../app.ts'
import { makeCourses } from '../tests/factories/make-courses.ts'

test('Get course', async () => {
  api.ready()

  const titleId = randomUUID()

  await makeCourses(titleId)

  const response = await request(api.server).get(`/courses?search=${titleId}`)

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollmentsCount: 0,
      },
    ],
  })
})
