import { TaskScheduleModule } from "./taskSchedule/taskSchedule.module";
import { AuthModule } from "./auth/auth.module";
import { CourseModule } from "./course/course.module";
import { FacultyModule } from "./faculty/faculty.module";
import { CourseTypeModule } from "./course-type/course-type.module";
import { StudentModule } from "./student/student.module";
import { PriorityModule } from "./priority/priority.module";
import { ProvinceModule } from "./province/province.module";
import { MajorModule } from "./major/major.module";
import { ProgramItemModule } from "./program-item/program-item.module";
import { CourseOpenModule } from "./course-open/course-open.module";
const modules = [
  TaskScheduleModule,
  AuthModule,
  CourseModule,
  FacultyModule,
  CourseTypeModule,
  StudentModule,
  PriorityModule,
  ProvinceModule,
  MajorModule,
  ProgramItemModule,
  CourseOpenModule,
];

export default modules;
