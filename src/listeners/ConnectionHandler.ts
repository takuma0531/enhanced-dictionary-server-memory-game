import { Server, Socket } from "socket.io";
import { SocketEventNames } from "../enums/SocketEventNames";

class ConnectionHandler {
  private _io: Server;
  private _socket: Socket;

  public init(io: Server, socket: Socket) {
    this._io = io;
    this._socket = socket;
    this.onDisconnect();
  }

  public onDisconnect() {
    this._socket.on(SocketEventNames.DISCONNECT, () => {
      console.log("disconnected");
    });
  }
}

export const connectionHandler = new ConnectionHandler();
