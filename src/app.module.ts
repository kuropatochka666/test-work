import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RentCarModule } from './rent-car/rent-car.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RentCarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
