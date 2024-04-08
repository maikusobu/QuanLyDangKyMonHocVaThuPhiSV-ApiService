import { InsertStudent } from "src/db/schema";

export class CreateStudentDto implements InsertStudent {
  name: string;
  dateOfBirth: string;
  gender: "male" | "female";
  majorId: number;
  districtId: number;
  priorityId: number;
}
