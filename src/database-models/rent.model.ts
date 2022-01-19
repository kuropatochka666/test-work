import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RentModel {

  @ApiProperty({example: 1, description: 'Идентификатор аренды'})
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({example: 2, description: 'Идентификатор машины'})
  @IsNumber()
  @IsNotEmpty()
  car_id: number

  @ApiProperty({example: "2020-03-01", description: 'Начало аренды'})
  @IsString()
  @IsNotEmpty()
  start_session: string

  @ApiProperty({example: "2020-03-01", description: 'Конец аренды'})
  @IsString()
  @IsNotEmpty()
  end_session: string

  @ApiProperty({example: 4000, description: 'Цена'})
  @IsNumber()
  @IsNotEmpty()
  price: number
}
