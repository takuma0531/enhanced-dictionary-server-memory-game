import { initDotenv } from "..";

initDotenv();

export class ClientConstants {
  public static readonly CLIENT_HOST =
    process.env.CLIENT_HOST || "http://localhost";
  public static readonly CLIENT_PORT = process.env.CLIENT_PORT || "8000";
}
