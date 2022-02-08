import express, { Express } from "express";
import { Server as SocketServer, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import { ServerParts, Route } from "./typings/common";
import { SocketEventNames } from "./enums/SocketEventNames";

export class Server {
  private readonly _app: Express;
  private readonly _httpServer: HttpServer;
  private readonly _io: SocketServer;
  private readonly _port: string;
  private readonly _host: string;

  constructor(serverParts: ServerParts) {
    this._app = express();
    this._httpServer = createServer(this._app);
    this._io = new SocketServer(this._httpServer);
    this._host = serverParts.host;
    this._port = serverParts.port;
    this.setMiddlewares(serverParts.middlewares);
    // this.setRoutes(serverParts.routes);
  }

  public init() {
    // TODO:
    this._io.on(SocketEventNames.CONNECTION, (socket: Socket) => {
      console.log("connected");
    });
    this._httpServer.listen(this._port, () => {
      console.log(`Server is running on ${this._host}:${this._port}`);
    });
  }

  private setMiddlewares(middlewares: Array<any>) {
    middlewares.forEach((middleware) => {
      this._app.use(middleware);
    });
  }

  // private setRoutes(routes: Array<any>) {
  //   routes.forEach((route: Route) => {
  //     this._app.use(route.baseRoute, route.router);
  //   });
  // }
}
