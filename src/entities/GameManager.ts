import { Board } from "../Board";
import { Word } from "../typings/word";

class GameManager {
  private games: Record<string, Board> = {};

  public createGame(room: string, words: Word[]): Board {
    const board = new Board(words);
    this.games[room] = board;
    return board;
  }

  public getGame(room: string): Board {
    return this.games[room];
  }

  public deleteGame(room: string) {
    delete this.games[room];
  }
}

export const gameManager = new GameManager();
