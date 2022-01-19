import { IsBoolean, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CheckRentDto {

  constructor(price: number | null, isRented: boolean) {
    this.price = price;
    this.isRented = isRented;
  }

  @ApiProperty( {example: 2000})
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  price: number | null

  @ApiProperty({example: true})
  @IsBoolean()
  @IsNotEmpty()
  isRented: boolean
}
