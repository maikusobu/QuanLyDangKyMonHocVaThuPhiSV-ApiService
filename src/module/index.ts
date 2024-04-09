import { TaskScheduleModule } from "./taskSchedule/taskSchedule.module";
import { AuthModule } from "./auth/auth.module";
import { CourseModule } from "./course/course.module";

const modules = [TaskScheduleModule, AuthModule, CourseModule];

export default modules;
