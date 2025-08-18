import { fakerPT_BR as faker } from '@faker-js/faker'
import { db } from './client.ts'
import { schema } from './schema/index.ts'

async function seed() {
  await db.delete(schema.enrollments)
  await db.delete(schema.courses)
  await db.delete(schema.users)

  const usersInsert = await db
    .insert(schema.users)
    .values([
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
    ])
    .returning()

  const coursesInsert = await db
    .insert(schema.courses)
    .values([
      {
        title: 'Curso de Node.js',
        description:
          'Aprenda os fundamentos do Node.js e como construir aplicações escaláveis.',
      },
      {
        title: 'Curso de TypeScript',
        description:
          'Domine o TypeScript e melhore a qualidade do seu código JavaScript.',
      },
      {
        title: 'Curso de Fastify',
        description: 'Construa APIs rápidas e eficientes com Fastify.',
      },
      {
        title: 'Curso de Drizzle ORM',
        description:
          'Gerencie seu banco de dados com Drizzle ORM de forma simples e eficaz.',
      },
      {
        title: 'Curso de Testes com Vitest',
        description:
          'Implemente testes automatizados em suas aplicações usando Vitest.',
      },
    ])
    .returning()

  await db.insert(schema.enrollments).values([
    { userId: usersInsert[0].id, courseId: coursesInsert[0].id },
    { userId: usersInsert[0].id, courseId: coursesInsert[1].id },
    { userId: usersInsert[1].id, courseId: coursesInsert[1].id },
    { userId: usersInsert[1].id, courseId: coursesInsert[2].id },
    { userId: usersInsert[2].id, courseId: coursesInsert[2].id },
    { userId: usersInsert[2].id, courseId: coursesInsert[3].id },
    { userId: usersInsert[3].id, courseId: coursesInsert[3].id },
    { userId: usersInsert[3].id, courseId: coursesInsert[4].id },
    { userId: usersInsert[4].id, courseId: coursesInsert[4].id },
    { userId: usersInsert[4].id, courseId: coursesInsert[0].id },
  ])
}

seed()
