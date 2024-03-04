import { PrismaModule } from "./prisma/prisma.module";
import { TaskScheduleModule } from "./taskSchedule/taskSchedule.module";
const modules = [PrismaModule, TaskScheduleModule];
export default modules;
