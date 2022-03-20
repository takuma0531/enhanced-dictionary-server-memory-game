import { Socket } from "socket.io";
import { gameManager } from "../entities/GameManager";
import { Word } from "../typings/word";
import { SocketEventNames } from "../enums/SocketEventNames";
import socketServer from "../SocketServer";

class GameHandler {
  public init() {
    socketServer.on(SocketEventNames.GAME_START, this.onShuffle);
    socketServer.on(SocketEventNames.GAME_CLICK, this.onClick);
  }

  public onShuffle(socket: Socket, words: Word[]) {
    const room = Array.from(socket.rooms)[1];
    const board = gameManager.createGame(room, words);
    socketServer.emit(SocketEventNames.INITIAL_GAME_DATA_SHARE, board.cards);
  }

  public onClick(socket: Socket, wordCardOrderId: number) {
    const room = Array.from(socket.rooms)[1];
    const game = gameManager.getGame(room);

    game.checkIfFlippable(wordCardOrderId) &&
      socketServer.emit(SocketEventNames.GAME_FLIP, wordCardOrderId);

    const currentlySelectedCards = game.click(wordCardOrderId);

    if (currentlySelectedCards.length !== 2) return;

    if (game.checkIfMatched()) {
      socketServer.emit(SocketEventNames.GAME_CHECK, currentlySelectedCards);

      game.checkIfFinished() && socketServer.emit(SocketEventNames.GAME_FINISH);
    } else {
      socketServer.emit(SocketEventNames.GAME_UNFLIP, currentlySelectedCards);
    }
  }
}

export const gameHandler = new GameHandler();
