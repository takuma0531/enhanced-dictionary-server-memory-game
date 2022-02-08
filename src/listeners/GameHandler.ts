import { Socket, Server } from "socket.io";

export class GameHandler {
  private readonly _io: Server;
  private readonly _socket: Socket;

  constructor(io: Server, socket: Socket) {
    this._io = io;
    this._socket = socket;
  }

  public init() {}

  public onShuffle() {}

  public onClick() {}
}
