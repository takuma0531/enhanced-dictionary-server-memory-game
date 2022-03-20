import { Server, Socket } from "socket.io";
import { SocketEventNames } from "../enums/SocketEventNames";
import socketServer from "../SocketServer";

class ConnectionHandler {
  public onDisconnect() {
    socketServer.on(SocketEventNames.DISCONNECT, () => {
      console.log("disconnected");
    });
  }
}

export const connectionHandler = new ConnectionHandler();
