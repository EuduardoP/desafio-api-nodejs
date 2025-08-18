import request from 'supertest'
import { beforeEach, expect, test } from 'vitest'
import { api } from '../app.ts'
import { makeUser } from '../tests/factories/make-user.ts'

beforeEach(async () => {
  await api.ready()
})

test('Login', async () => {
  const { passwordWithoutHash, user } = await makeUser('student')

  const response = await request(api.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({
      email: user.email,
      password: passwordWithoutHash,
    })

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    token: expect.any(String),
  })
})

test('Returns 400 when email does not exist', async () => {
  const response = await request(api.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({
      email: 'email@notfoud.com',
      password: '123456',
    })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({
    message: 'Invalid credentials',
  })
})

test('Returns 400 when password does not exist', async () => {
  const { user } = await makeUser('student')

  const response = await request(api.server)
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({
      email: user.email,
      password: '123456',
    })

  expect(response.status).toBe(400)
  expect(response.body).toEqual({
    message: 'Invalid credentials',
  })
})
