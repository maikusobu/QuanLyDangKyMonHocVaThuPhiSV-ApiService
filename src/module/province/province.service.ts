import { Injectable } from "@nestjs/common";
import { ProvinceDistrictRepository } from "@repository/province/province.repository";
@Injectable()
export class ProvinceService {
  constructor(private provinceDistrictRepository: ProvinceDistrictRepository) {}
  async findAllProvince() {
    return this.provinceDistrictRepository.getAllProvince();
  }

  async findAllDistrict(id: number) {
    return this.provinceDistrictRepository.getDistrictByProvinceId(id);
  }
}
