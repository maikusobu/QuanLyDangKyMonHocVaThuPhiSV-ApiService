import { InsertUser } from "@db/schema";

/**
 * Password for all seed users is "12345678@Xx"
 */
// Phòng đào tạo
export const user_pdt: InsertUser[] = [
  {
    email: "user_pdt@gmail.com",
    fullName: "user_pdt",
    role: "employee",
    hashedPassword:
      "$2b$10$c9WT1igqQA4y2TxkRdLYZuXukVmZ9ndzQgdvOMq9ozq/lhj/0YyXe",
  },
];
// Phòng quản lý sinh viên
export const user_pqlsv: InsertUser[] = [
  {
    email: "user_pqlsv@gmail.com",
    fullName: "user_pqlsv",
    role: "employee",
    hashedPassword:
      "$2b$10$c9WT1igqQA4y2TxkRdLYZuXukVmZ9ndzQgdvOMq9ozq/lhj/0YyXe",
  },
];
// Phòng kế hoạch tài chính
export const user_pkhtc: InsertUser[] = [
  {
    email: "user_pkhtc@gmail.com",
    fullName: "user_pkhtc",
    role: "employee",
    hashedPassword:
      "$2b$10$c9WT1igqQA4y2TxkRdLYZuXukVmZ9ndzQgdvOMq9ozq/lhj/0YyXe",
  },
];
