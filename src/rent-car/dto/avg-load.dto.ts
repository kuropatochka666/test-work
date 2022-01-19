import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AvgLoadModel } from "../../database-models/avg-load.model";

export class AvgLoadDto {

  constructor(cars_report: AvgLoadModel[], avg_cars_percent: number) {
    this.cars_report = cars_report;
    this.avg_cars_percent = avg_cars_percent;
  }

  @ApiProperty({ type: [AvgLoadModel]})
  @IsString()
  @IsNotEmpty()
  @ValidateNested()
  cars_report: AvgLoadModel[]

  @ApiProperty({example: 6})
  @IsNumber()
  @IsNotEmpty()
  avg_cars_percent: number
}
