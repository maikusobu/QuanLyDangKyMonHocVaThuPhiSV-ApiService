import { Injectable, Param, ParseIntPipe } from "@nestjs/common";
import { MajorRepository } from "@repository/major/major.repository";
@Injectable()
export class MajorService {
  constructor(private majorReposiotry: MajorRepository) {}
  findAll() {
    return this.majorReposiotry.getAllMajor();
  }
  findProgramByMajorId(@Param("id", ParseIntPipe) id: number) {
    return this.majorReposiotry.findProgramByMajorId(id);
  }
}
