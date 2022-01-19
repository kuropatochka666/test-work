import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { DateValidation } from "../../validators/date-validation";
import { CheckMaxDate } from "../../validators/check-max-date";


export class RentDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: "2020-01-21" })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Validate(DateValidation, {
    message: "Старт аренды может осуществляться только в будние дни."
  })
  start_session: string;

  @ApiProperty({ example: "2020-01-22" })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Validate(DateValidation, {
    message: "Конец аренды может осуществляться только в будние дни."
  })
  @Validate(CheckMaxDate, {
    message: "Максимальный срок аренды 30 дней."
  })
  end_session: string;
}
