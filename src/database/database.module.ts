import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";
import { DatabaseService } from "./database.service";

@Module({
  providers: [
    DatabaseService,
    ...databaseProviders
  ],
  exports: [
    DatabaseService,
    ...databaseProviders
  ]
})
export class DatabaseModule {}
