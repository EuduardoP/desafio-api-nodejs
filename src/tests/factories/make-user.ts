import { randomUUID } from 'node:crypto'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'
import jwt from 'jsonwebtoken'
import { db } from '../../db/client.ts'
import { schema } from '../../db/schema/index.ts'

export async function makeUser(role: 'manager' | 'student') {
  const passwordWithoutHash = randomUUID()

  const result = await db
    .insert(schema.users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordWithoutHash),
      role,
    })
    .returning()

  return {
    user: result[0],
    passwordWithoutHash,
  }
}

export async function makeAuthenticatedUser(role: 'manager' | 'student') {
  const { user } = await makeUser(role)

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET as string
  )

  return { user, token: `Bearer ${token}` }
}
