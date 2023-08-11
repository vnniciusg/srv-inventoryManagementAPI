import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entity/Product";

import * as dotenv from "dotenv";

dotenv.config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: POSTGRES_USER as string,
  password: POSTGRES_PASSWORD as string,
  database: POSTGRES_DB as string,
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
