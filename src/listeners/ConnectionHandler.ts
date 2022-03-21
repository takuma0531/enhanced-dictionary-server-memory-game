import { Server, Socket } from "socket.io";
import { SocketEventNames } from "../enums/SocketEventNames";

class ConnectionHandler {
  public static _instance: ConnectionHandler;

  constructor() {}

  public static getInstance() {
    if (!this._instance) this._instance = new ConnectionHandler();
    return this._instance;
  }

  public onDisconnect(socket: Socket) {
    socket.on(SocketEventNames.DISCONNECT, () => {
      console.log("disconnected");
    });
  }
}

export default ConnectionHandler;
