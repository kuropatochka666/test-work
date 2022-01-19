import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import * as moment from "moment";
import { RentDto } from "./dto/rent.dto";
import { CheckRentDto } from "./dto/check-rent.dto";
import { RentResponseDto } from "./dto/rent-response.dto";
import { AvgLoadDto } from "./dto/avg-load.dto";


@Injectable()
export class RentCarService {
  constructor(private readonly databaseService: DatabaseService) {
  }

  async checkBusy({ id, start_session, end_session }: RentDto) {
    const startDate = moment(start_session).subtract(3, "days").format("YYYY-MM-DD");
    const endDate = moment(end_session).add(3, "days").format("YYYY-MM-DD");

    const rentCars = await this.databaseService.executeQuery(
      `SELECT *
       FROM rent
       WHERE car_id = '${id}'
         AND ((start_session BETWEEN '${startDate}' AND '${endDate}')
           OR (end_session BETWEEN '${startDate}' AND '${endDate}')
           OR (start_session <= '${startDate}' AND end_session >= '${endDate}'))`);

    return rentCars.length === 0;
  }

  async checkPrice({ start_session, end_session }: Omit<RentDto, "id">) {
    const start = moment(start_session, "YYYY-MM-DD");
    const end = moment(end_session, "YYYY-MM-DD");

    const days = moment.duration(end.diff(start)).asDays() + 1;

    const basePrice = await this.databaseService
      .executeQuery(
        `SELECT price
         FROM prices
         WHERE alias = 'base'`
      )
      .then(e => e[0].price);

    const tariffs = await this.databaseService.executeQuery(`SELECT *
                                                             FROM tariffs`);

    let price = 0;

    for (let d = days; d > 0; d--) {

      for (let i = 0; i <= tariffs.length; i++) {

        if (i === tariffs.length) {
          price += basePrice;
          break;
        }

        if (tariffs[i].start_date <= d && (d <= tariffs[i].end_date)) {
          price += basePrice * ((100 - tariffs[i].percent_sale) / 100);
          break;
        }
      }
    }

    return price;
  }

  async checkRent({ id, start_session, end_session }: RentDto) {
    const busy = await this.checkBusy({ id, start_session, end_session });

    const price = await this.checkPrice({ start_session, end_session });

    if (!busy) {
      return new CheckRentDto(price, true);
    }

    return new CheckRentDto(price, false);
  }

  async rentCar({ id, start_session, end_session }: RentDto ) {
    const busy = await this.checkBusy({ start_session, id, end_session });

    const price = await this.checkPrice({ start_session, end_session });

    if (!busy) {
      return new RentResponseDto(true, id, start_session, end_session, price);
    }


    try {
      await this.databaseService.executeQuery(
        `INSERT INTO rent (car_id, start_session, end_session, price)
         VALUES (${id}, '${start_session}', '${end_session}', ${price}) RETURNING id, car_id, start_session, end_session, price`);

      return new RentResponseDto(false, id, start_session, end_session, price);
    } catch (e) {
      throw e;
    }
  }

  async avgLoad(date: string) {

    try {
      const carsReport = await this.databaseService.executeQuery(
        `
            SELECT car.car_name,
                   car.car_number,
                   to_char(r.end_session, 'YYYY-MM-DD') as end_session,
                   to_char(r.start_session, 'YYYY-MM-DD') as start_session
            FROM cars car
                     LEFT JOIN rent r on car.id = r.car_id
                     left JOIN LATERAL
                (SELECT to_char(gs, 'YYYY-MM') as year_month
                 FROM generate_series(r.start_session, r.end_session, interval '1 day') gs
                 GROUP BY year_month
                    ) rent_lat ON TRUE

            WHERE rent_lat.year_month = '${date}'

            group BY  car.car_name, car.car_number, r.start_session, r.end_session

        `)


      const reportLength = carsReport.length

      if (reportLength === 0) {
        return new AvgLoadDto(carsReport, 0)
      }

      let carsRentSum = 0
      const daysInMonth = moment(date, "YYYY-MM").daysInMonth();

      carsReport.forEach(car => {
        const start = moment(car.start_session, "YYYY-MM-DD");
        const end = moment(car.end_session, "YYYY-MM-DD");
        const days = moment.duration(end.diff(start)).asDays() + 1;
        carsRentSum += days
        car.car_percent = Math.round(days * (100 / daysInMonth))
      });

      const carsPercent = Math.round((carsRentSum / reportLength) * (100 / daysInMonth))
      return new AvgLoadDto(carsReport, carsPercent)
    } catch (e) {
      throw e;
    }
  }
}
