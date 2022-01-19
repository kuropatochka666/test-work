import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class RentDto {

  @ApiProperty({example: 1})
  @IsNumber()
  id: number;

  @ApiProperty( {example: "2020-01-21"})
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  start_session: string;

  @ApiProperty( {example: "2020-01-22"})
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  end_session: string;
}
