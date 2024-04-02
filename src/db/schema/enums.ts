import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "employee", "student"]);

export const actionEnum = pgEnum("action", [
  "get",
  "post",
  "put",
  "patch",
  "delete",
]);

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const termEnum = pgEnum("term", ["first", "second", "third"]);
