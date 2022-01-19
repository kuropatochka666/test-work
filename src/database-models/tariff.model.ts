import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TariffModel {

  @ApiProperty({example: 1, description: 'Идентификатор тарифа'})
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({example: 5, description: 'День начала аренды'})
  @IsNumber()
  @IsNotEmpty()
  start_date: number

  @ApiProperty({example: 9, description: 'День конца аренды'})
  @IsNumber()
  @IsNotEmpty()
  end_date: number

  @ApiProperty({example: 10, description: 'Скидка аренды в процентах'})
  @IsNumber()
  @IsNotEmpty()
  percent_sale: number
}
