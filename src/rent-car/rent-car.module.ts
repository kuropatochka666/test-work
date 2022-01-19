import { Module } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { RentCarController } from './rent-car.controller';
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RentCarController],
  providers: [RentCarService]
})
export class RentCarModule {}
