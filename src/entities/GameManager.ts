import { Board } from "../Board";
import { Word } from "../typings/word";

export class GameManager {
  private games: Record<string, Board> = {};

  public createGame(room: string, words: Word[]) {
    this.games[room] = new Board(words);
  }

  public getGame(room: string) {
    return this.games[room];
  }

  public deleteGame(room: string) {
    delete this.games[room];
  }
}
