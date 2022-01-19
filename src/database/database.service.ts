import { Inject, Injectable, Logger } from "@nestjs/common";
import { Pool, QueryResult } from "pg";
import { DatabasePool } from "./database-pool";

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject(DatabasePool.PG_POOl) private pool: Pool) {}

  executeQuery(queryText: string, values: any[] = []): Promise<any[]> {

    this.logger.debug(`Executing query: ${queryText} (${values})`);

    return this.pool.query(queryText, values).then((result: QueryResult) => {

      this.logger.debug(`Executed query, result size ${result.rows.length}`);

      return result.rows;
    });
  }
}
