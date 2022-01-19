import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";
import { DatabasePool } from "./database-pool";


export const databaseProviders = [
  {
    provide: DatabasePool.PG_POOl,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const pool = new Pool({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
      });
      return pool;
    },
  },
];
