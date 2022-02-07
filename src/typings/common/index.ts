import { Router } from "express";

export interface ServerParts {
  host: string;
  port: string;
  middlewares: Array<any>;
  // routes: Array<Route>;
}

export interface Route {
  baseRoute: string;
  router: Router;
}
