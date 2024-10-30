import "reflect-metadata";
import { DataSource } from "typeorm";
import appConfig from "../config/appConfig";
import path from "path";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";
import { Budget } from "../entity/budget.entity";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  appConfig.env;
function getEntities({ baseDir }: { baseDir: string }) {
  let entities = [baseDir + "/entity/*.ts"];
  if (process.env.NODE_ENV === "production") {
    entities = [baseDir + "/entity/*.js"];
  }
  return entities;
}

export const AppDataSource = ({ baseDir }: { baseDir: string }) => {
  return new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT ?? "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    synchronize: NODE_ENV === "development" ? true : false,
    //logging logs sql command on the treminal
    logging: NODE_ENV === "development" ? false : false,
    entities: [User, Role, Budget],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
  });
};
