import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { faker } from "@faker-js/faker/locale/vi";
import { district, student } from "./schema";

const seed = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  function getRandomGender() {
    const genders = ["male", "female"];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
  }
  const db = drizzle(client);
  const randomDistrict = await db
    .select()
    .from(district)
    .limit(1)
    .offset(Math.floor(Math.random() * 644));

  const daStudent = [];
  for (let i = 0; i < 100; i++) {
    daStudent.push({
      name: faker.person.fullName(),
      dateOfBirth: faker.date.birthdate(),
      gender: getRandomGender(),
      majorId: Math.floor(Math.random() * 13) + 1,
      address: faker.location.streetAddress(),
      priorityId: Math.floor(Math.random() * 4) + 1,
      districtId: randomDistrict[0].id,
    });
  }
  await db.insert(student).values(daStudent).execute();
};
seed();
