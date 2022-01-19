import { RentModel } from '../../database-models/rent.model'
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RentResponseDto implements Omit<RentModel, 'id'> {

  constructor(isRented: boolean, car_id: number, start_session: string, end_session: string, price: number | null) {
    this.isRented = isRented;
    this.car_id = car_id;
    this.start_session = start_session;
    this.end_session = end_session;
    this.price = price;
  }

  @ApiProperty({example: true})
  @IsBoolean()
  @IsNotEmpty()
  isRented: boolean;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty({example: "2020-01-21"})
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  start_session: string;

  @ApiProperty({example: "2020-01-22"})
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  end_session: string;

  @ApiProperty({example: 2000})
  @IsNumber()
  @IsNotEmpty()
  price: number;

}
