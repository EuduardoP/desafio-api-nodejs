import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { expect, test } from 'vitest'
import { api } from '../app.ts'
import { makeCourses } from '../tests/factories/make-courses.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'

test('Get course', async () => {
  await api.ready()

  const titleId = randomUUID()

  await makeCourses(titleId)
  const { token } = await makeAuthenticatedUser('manager')

  const response = await request(api.server)
    .get(`/courses?search=${titleId}`)
    .set('Authorization', token)

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
