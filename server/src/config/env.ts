import { cleanEnv, num, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  DB_CONNECTION_URL: url(),
  TOKEN_SPAN: str({ default: "7d" }),
  TOKEN_SECRET: str(),
  REFRESH_SECRET: str(),
  DB_HOST: str(),
  DB_PORT: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  JWT_SECRET: str(),
});
