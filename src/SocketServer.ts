import { Server } from "socket.io";
import { Server as HttpServer } from "http";

class SocketServer {
  private _io: Server;

  constructor() {}

  public init(srv: HttpServer | any, opts: any) {
    this._io = new Server(srv, opts);
  }

  public emit(socketEventName: string, data?: any) {
    this._io.emit(socketEventName, data);
  }

  public on(socketEventName: string, data?: any) {
    this._io.on(socketEventName, data);
  }
}

export default new SocketServer();
