import { config } from "dotenv";

export const initDotenv = () =>
  config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });
