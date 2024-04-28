import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { major } from "./schema";

const seed = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  await db.insert(major).values([
    { name: "Khoa học máy tính", facultyId: 1 },
    { name: "Khoa học máy tính tài năng", facultyId: 1 },
    { name: "Kỹ thuật phần mềm", facultyId: 2 },
    { name: "Hệ thống thông tin", facultyId: 3 },
    { name: "Hệ thống thông tin tiên tiến", facultyId: 3 },
    { name: "Công nghệ thông tin", facultyId: 4 },
    { name: "Khoa học dữ liệu", facultyId: 4 },
    { name: "An toàn thông tin", facultyId: 5 },
    { name: "Mạng máy tính và truyền thông", facultyId: 5 },
    {
      name: "Kỹ thuật máy tính",
      facultyId: 6,
    },
    {
      name: "Thiết kế bán dẫn",
      facultyId: 6,
    },
    { name: "Trí tuệ nhân tạo", facultyId: 1 },
    { name: "An toàn thông tin tài năng", facultyId: 5 },
  ]);
};

seed();
