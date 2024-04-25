import { TaskScheduleModule } from "./taskSchedule/taskSchedule.module";
import { AuthModule } from "./auth/auth.module";
import { CourseModule } from "./course/course.module";
import { FacultyModule } from "./faculty/faculty.module";
import { CourseTypeModule } from "./course-type/course-type.module";

const modules = [
  TaskScheduleModule,
  AuthModule,
  CourseModule,
  FacultyModule,
  CourseTypeModule,
];

export default modules;
