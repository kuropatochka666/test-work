import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CarModel{
  @ApiProperty({example: 2, description: 'Идентификатор машины'})
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({example: 'А123ВС', description: 'Номер машины'})
  @IsString()
  @IsNotEmpty()
  car_number: string

  @ApiProperty({example: 'Hyundai Solaris', description: 'Наименование машины'})
  @IsString()
  @IsNotEmpty()
  car_name: string
}
