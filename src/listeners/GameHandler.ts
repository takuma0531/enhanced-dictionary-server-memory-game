import { Socket, Server } from "socket.io";
import { gameManager } from "../entities/GameManager";
import { Word } from "../typings/word";

class GameHandler {
  private _io: Server;
  private _socket: Socket;

  public init(io: Server, socket: Socket) {
    this._io = io;
    this._socket = socket;
    this._socket.on("game:start", this.onShuffle);
    this._socket.on("game:click", this.onClick);
  }

  public onShuffle(words: Word[]) {
    const room = Array.from(this._socket.rooms)[1];
    gameManager.createGame(room, words);
  }

  public onClick(wordCardOrderId: number) {
    const room = Array.from(this._socket.rooms)[1];
    const game = gameManager.getGame(room);

    game.checkIfFlippable(wordCardOrderId) &&
      this._io.emit("game:flip", wordCardOrderId);

    const currentlySelectedCards = game.click(wordCardOrderId);

    if (currentlySelectedCards.length !== 2) return;

    if (game.checkIfMatched()) {
      this._io.emit("game:check", currentlySelectedCards);

      game.checkIfFinished() && this._io.emit("game:finish");
    } else {
      this._io.emit("game:unflip", currentlySelectedCards);
    }
  }
}

export const gameHandler = new GameHandler();
