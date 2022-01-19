import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PriceModel{
  @ApiProperty({example: 31, description: 'Идентификатор цены'})
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty({example: 2000, description: 'Цена аренды'})
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty({example: "base", description: 'Тариф'})
  @IsString()
  @IsNotEmpty()
  alias: string
}
