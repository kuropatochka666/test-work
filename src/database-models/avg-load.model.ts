import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AvgLoadModel{
  @ApiProperty({example: 'М001АС', description: 'Номер машины'})
  @IsString()
  @IsNotEmpty()
  car_number: string

  @ApiProperty({example: 'Hyundai Solaris', description: 'Наименование машины'})
  @IsString()
  @IsNotEmpty()
  car_name: string

  @ApiProperty({example: '6', description: 'Процент загруженности машины в месяц'})
  @IsNumber()
  @IsNotEmpty()
  car_percent: number;

  @ApiProperty({example: '2020-01-01', description: 'Начало аренды'})
  @IsString()
  @IsNotEmpty()
  start_session: string

  @ApiProperty({example: '2020-01-03', description: 'Конец аренды'})
  @IsString()
  @IsNotEmpty()
  end_session: string
}
