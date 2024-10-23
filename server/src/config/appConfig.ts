import { env } from "./env";
import { IAppConfig } from "../types/config.interface";
import merge from "deepmerge";

const appConfig: IAppConfig = {
  env: Object.defineProperties(
    merge(env, {
      // ! ... Other custom env properties
    }),
    Object.getOwnPropertyDescriptors(env),
  ),
};

export default appConfig;
