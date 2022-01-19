import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class AvgLoadRequestDto{
  @ApiProperty({example: "2020-02"})
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
