import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { faker } from '@faker-js/faker';
import { create } from "domain";

function createRandomUser(id: number): User {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const fullName = `${firstName} ${lastName}`
  const username = faker.internet.userName({firstName, lastName})
  const email = faker.internet.email({firstName, lastName})

  return {
    id,
    name: fullName,
    email,
    username,
    birth: faker.date.birthdate(),
    city: faker.location.city(),
    createdAt: null,
    updatedAt: null
  };
}

export async function seedUser () {
  const usersToInsert = [];

  for (let i = 1; i <= 100; i++) {
    usersToInsert.push(createRandomUser(i));
  }

  await db.insert(users).values(usersToInsert)
}