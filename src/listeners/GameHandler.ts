import { Socket, Server } from "socket.io";
import { gameManager } from "../entities/GameManager";
import { Word } from "../typings/word";
import { SocketEventNames } from "../enums/SocketEventNames";

class GameHandler {
  private _io: Server;
  private _socket: Socket;

  public init(io: Server, socket: Socket) {
    this._io = io;
    this._socket = socket;
    this._socket.on(SocketEventNames.GAME_START, this.onShuffle);
    this._socket.on(SocketEventNames.GAME_CLICK, this.onClick);
  }

  public onShuffle(words: Word[]) {
    const room = Array.from(this._socket.rooms)[1];
    const board = gameManager.createGame(room, words);
    this._io.emit(SocketEventNames.INITIAL_GAME_DATA_SHARE, board.cards);
  }

  public onClick(wordCardOrderId: number) {
    const room = Array.from(this._socket.rooms)[1];
    const game = gameManager.getGame(room);

    game.checkIfFlippable(wordCardOrderId) &&
      this._io.emit(SocketEventNames.GAME_FLIP, wordCardOrderId);

    const currentlySelectedCards = game.click(wordCardOrderId);

    if (currentlySelectedCards.length !== 2) return;

    if (game.checkIfMatched()) {
      this._io.emit(SocketEventNames.GAME_CHECK, currentlySelectedCards);

      game.checkIfFinished() && this._io.emit(SocketEventNames.GAME_FINISH);
    } else {
      this._io.emit(SocketEventNames.GAME_UNFLIP, currentlySelectedCards);
    }
  }
}

export const gameHandler = new GameHandler();
