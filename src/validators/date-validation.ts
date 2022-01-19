import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as moment from "moment";


@ValidatorConstraint()
export class DateValidation implements ValidatorConstraintInterface {
  validate(data: string, validationArguments?: ValidationArguments) {
    const date = moment(data, "YYYY-MM-DD").day()
    return !(date === 6 || date === 0);
  }
}
