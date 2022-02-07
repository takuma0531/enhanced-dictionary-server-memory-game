import express from "express";
import cors from "cors";
import { Server } from "./Server";
import { ServerParts } from "./typings/common";
import { ServerConstants } from "./config/constants";

const serverParts: ServerParts = {
  host: ServerConstants.SERVER_HOST,
  port: ServerConstants.SERVER_PORT,
  middlewares: [express.json(), cors()],
//   routes: [],
};

const server = new Server(serverParts);
server.init();
