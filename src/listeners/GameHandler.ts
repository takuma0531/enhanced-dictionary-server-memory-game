import { Socket, Server } from "socket.io";
import { gameManager } from "../entities/GameManager";
import { Word } from "../typings/word";
import { SocketEventNames } from "../enums/SocketEventNames";

class GameHandler {
  private static _instance: GameHandler;

  constructor() {}

  public static getInstance() {
    if (this._instance == null) this._instance = new GameHandler();
    return this._instance;
  }

  public init(io: Server, socket: Socket) {
    this.onShuffle(io, socket);
    this.onClick(io, socket);
  }

  public onShuffle(io: Server, socket: Socket) {
    socket.on(SocketEventNames.GAME_START, (words: Word[]) => {
      const room = Array.from(socket.rooms)[1];
      const board = gameManager.createGame(room, words);
      io.emit(SocketEventNames.INITIAL_GAME_DATA_SHARE, board.cards);
    });
  }

  public onClick(io: Server, socket: Socket) {
    socket.on(SocketEventNames.GAME_CLICK, (wordCardOrderId: number) => {
      const room = Array.from(socket.rooms)[1];
      const game = gameManager.getGame(room);

      game.checkIfFlippable(wordCardOrderId) &&
        io.emit(SocketEventNames.GAME_FLIP, wordCardOrderId);

      const currentlySelectedCards = game.click(wordCardOrderId);

      if (currentlySelectedCards.length !== 2) return;

      if (game.checkIfMatched()) {
        io.emit(SocketEventNames.GAME_CHECK, currentlySelectedCards);

        game.checkIfFinished() && io.emit(SocketEventNames.GAME_FINISH);
      } else {
        io.emit(SocketEventNames.GAME_UNFLIP, currentlySelectedCards);
      }
    });
  }
}

export default GameHandler;
