import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as moment from "moment";


@ValidatorConstraint()
export class CheckMaxDate implements ValidatorConstraintInterface {
  validate(data: any, validationArguments?: ValidationArguments) {
    if (validationArguments.object["start_session"] && validationArguments.object["end_session"]) {
      const start = moment(validationArguments.object["start_session"], "YYYY-MM-DD");
      const end = moment(validationArguments.object["end_session"], "YYYY-MM-DD");

      const days = moment.duration(end.diff(start)).asDays();

      return days < 30;
    } else {
      return true;
    }
  }
}
