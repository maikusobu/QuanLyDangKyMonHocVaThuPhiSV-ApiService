import { Controller, Get, Param } from "@nestjs/common";
import { ProvinceService } from "./province.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.PROVINCE.BASE)
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  @Get()
  async findAllProvince() {
    return this.provinceService.findAllProvince();
  }
  @Get(END_POINTS.PROVINCE.GET_ALL_DISTRICT)
  async findAllDistrict(@Param("provinceId") provinceId: string) {
    return this.provinceService.findAllDistrict(+provinceId);
  }
}
