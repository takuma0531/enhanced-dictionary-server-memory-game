import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { SocketEventNames } from "./enums/SocketEventNames";
import { GameHandler, ConnectionHandler } from "./listeners";

class SocketServer {
  private static _instance: SocketServer;
  private _io: Server;

  constructor(srv: HttpServer | any, opts: any) {
    this._io = new Server(srv, opts);
  }

  public static getInstance(srv: HttpServer | any, opts: any) {
    if (this._instance == null) this._instance = new SocketServer(srv, opts);
    return this._instance;
  }

  public init() {
    this._io.on(SocketEventNames.CONNECTION, (socket: Socket) => {
      console.log("connected");
      const gameHandler = GameHandler.getInstance();
      gameHandler.init(this._io, socket);
      const connectionHandler = ConnectionHandler.getInstance();
      connectionHandler.onDisconnect(socket);
    });
  }
}

export default SocketServer;
