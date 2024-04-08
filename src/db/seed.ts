// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// import * as dotenv from "dotenv";

// dotenv.config({ path: "./.env.development" });

// if (!("DATABASE_URL" in process.env))
//   throw new Error("DATABASE_URL not found on .env.development");
// //id_department
// // 1: Phòng quản lý sinh viên
// // 2: Phòng kế hoạch tài chính
// // 3: Phòng đào tạo
// const main = async () => {
//   const client = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });
//   const db = drizzle(client);

//   // const data: (typeof user.$inferInsert)[] = [];
//   // const hashedPassword = await hashPassword("12345678@Xx");
//   // for (let i = 0; i < 20; i++) {
//   //   if (i < 5) {
//   //     data.push({
//   //       id: i + 1,
//   //       fullName: faker.internet.displayName(),
//   //       email: faker.internet.email(),
//   //       role: "admin",
//   //       hashedPassword: hashedPassword,
//   //       departmentId: null,
//   //     });
//   //   } else if (i < 15) {
//   //     data.push({
//   //       id: i + 1,
//   //       fullName: faker.internet.displayName(),
//   //       email: faker.internet.email(),
//   //       role: "employee",
//   //       hashedPassword: hashedPassword,
//   //       departmentId: Math.floor(Math.random() * 3) + 1,
//   //     });
//   //   } else {
//   //     data.push({
//   //       id: i + 1,
//   //       fullName: faker.internet.displayName(),
//   //       email: faker.internet.email(),
//   //       role: "student",
//   //       hashedPassword: hashedPassword,
//   //       departmentId: null,
//   //     });
//   //   }
//   // }

//   console.log("Seed start");
//   // await db.insert(permission).values(permissionDATA);
//   // await db.insert(user).values(data);
//   console.log("Seed done");
// };

// main();
