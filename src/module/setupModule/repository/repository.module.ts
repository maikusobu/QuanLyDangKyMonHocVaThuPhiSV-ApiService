import { Module, DynamicModule } from "@nestjs/common";
import { AuthRepository } from "@repository/auth/auth.repostiory";
import { UserRepository } from "@repository/user/user.repository";
import { PriorityRepository } from "@repository/priority/priority.repository";
import { StudentRepository } from "@repository/student/student.repository";
import { ProvinceDistrictRepository } from "@repository/province/province.repository";
import { MajorRepository } from "@repository/major/major.repository";
import { CourseRegistrationRepository } from "@repository/course-registration/course-registration.repository";
@Module({})
export class RepositoryModule {
  static forRoot({ isGlobal = false }): DynamicModule {
    return {
      global: isGlobal,
      module: RepositoryModule,
      providers: [
        UserRepository,
        AuthRepository,
        PriorityRepository,
        StudentRepository,
        ProvinceDistrictRepository,
        MajorRepository,
        CourseRegistrationRepository,
      ],
      exports: [
        UserRepository,
        AuthRepository,
        PriorityRepository,
        StudentRepository,
        ProvinceDistrictRepository,
        MajorRepository,
        CourseRegistrationRepository,
      ],
    };
  }
}
