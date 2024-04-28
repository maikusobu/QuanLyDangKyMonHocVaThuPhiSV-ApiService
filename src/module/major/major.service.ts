import { Injectable } from "@nestjs/common";
import { MajorRepository } from "@repository/major/major.repository";
@Injectable()
export class MajorService {
  constructor(private majorReposiotry: MajorRepository) {}
  findAll() {
    return this.majorReposiotry.getAllMajor();
  }
}
