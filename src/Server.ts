import express, { Express } from "express";
import { createServer, Server as HttpServer } from "http";
import { ServerParts, Route } from "./typings/common";
import { ClientConstants } from "./config/constants";
import CustomSocketServer from "./SocketServer";

export class Server {
  private readonly _app: Express;
  private readonly _httpServer: HttpServer;
  private readonly _port: string;
  private readonly _host: string;
  private readonly _customSocketServer: CustomSocketServer;

  constructor(serverParts: ServerParts) {
    this._app = express();
    this._httpServer = createServer(this._app);
    this._customSocketServer = CustomSocketServer.getInstance(
      this._httpServer,
      {
        cors: {
          origin: `${ClientConstants.CLIENT_HOST}:${ClientConstants.CLIENT_PORT}`,
        },
      }
    );
    this._host = serverParts.host;
    this._port = serverParts.port;
    this.setMiddlewares(serverParts.middlewares);
    // this.setRoutes(serverParts.routes);
  }

  public init() {
    this._customSocketServer.init();
    this._httpServer.listen(this._port, () => {
      console.log(`Server is running on ${this._host}:${this._port}`);
    });

    this._app.get("/", (req, res) => {
      res.send("<h1>Server is online</h1>");
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
