import { Server, Socket } from "socket.io";
import { SocketEventNames } from "../enums/SocketEventNames";

export class ConnectionHandler {
  private readonly _io: Server;
  private readonly _socket: Socket;

  constructor(io: Server, socket: Socket) {
    this._io = io;
    this._socket = socket;
  }

  public init() {
    this.onDisconnect();
  }

  public onDisconnect() {
    this._socket.on(SocketEventNames.DISCONNECT, () => {
      console.log("disconnected");
    });
  }
}
