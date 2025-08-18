import { fakerPT_BR as faker } from '@faker-js/faker'
import { db } from '../../db/client.ts'
import { schema } from '../../db/schema/index.ts'

export async function makeCourses(title?: string) {
  const result = await db
    .insert(schema.courses)
    .values({
      title: title ?? faker.lorem.words(4),
    })
    .returning()

  return result[0]
}
