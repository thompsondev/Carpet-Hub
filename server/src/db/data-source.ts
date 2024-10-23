import "reflect-metadata";
import { DataSource } from "typeorm";
import appConfig from "../config/appConfig";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  appConfig.env;

let entities = [__dirname + "/entity/*.ts"];
if (process.env.NODE_ENV === "production") {
  entities = [__dirname + "/entity/*.js"];
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT ?? "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: NODE_ENV === "development" ? false : false,
  //logging logs sql command on the treminal
  logging: NODE_ENV === "development" ? false : false,
  entities,
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
