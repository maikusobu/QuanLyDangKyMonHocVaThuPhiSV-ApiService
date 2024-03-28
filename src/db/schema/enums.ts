import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const termEnum = pgEnum("term", ["first", "second", "third"]);
