import { Body, Controller, Post } from "@nestjs/common";
import { RentCarService } from "./rent-car.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RentResponseDto } from "./dto/rent-response.dto";
import { CheckRentDto } from "./dto/check-rent.dto";
import { RentDto } from "./dto/rent.dto";
import { AvgLoadDto } from "./dto/avg-load.dto";
import { AvgLoadRequestDto } from "./dto/avg-load-request.dto";

@Controller("/")
export class RentCarController {
  constructor(private readonly rentCarService: RentCarService) {
  }

  @Post("check")
  @ApiOperation({ summary: "Проверка загруженности машины", tags: ["RentAPI"], description: "Формат даты YYYY-MM-DD"})
  @ApiResponse({ status: 200, type: CheckRentDto })
  async chekBusy(@Body() dto: RentDto): Promise<CheckRentDto> {
    return this.rentCarService.checkRent(dto);
  }

  @Post("rentCar")
  @ApiOperation({ summary: "Аренда машины", tags: ["RentAPI"], description: "Формат даты YYYY-MM-DD" })
  @ApiResponse({ status: 200, type: [RentResponseDto] })
  async rentCar(@Body() dto: RentDto): Promise<RentResponseDto > {
    return this.rentCarService.rentCar(dto);
  }

  @Post("sendReport")
  @ApiOperation({ summary: "Получить отчет о средней загрузке", tags: ["RentAPI"], description: "Формат даты YYYY-MM" })
  @ApiResponse({ status: 200, type: AvgLoadDto })
  async sendReport(@Body() dto: AvgLoadRequestDto): Promise<AvgLoadDto> {
    return this.rentCarService.avgLoad(dto.date);
  }

}
