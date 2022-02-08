import { Word, WordCard } from "./typings/word";
import { WordObjectConverter } from "./utils/WordObjectConverter";

export class Board {
  private _elapsedTime: number;
  private _cards: WordCard[];
  private _selectedCards: Record<string, WordCard>;

  constructor(words: Word[]) {
    this._elapsedTime = 0;
    this._cards = this.shuffle(words);
  }

  private shuffle(words: Word[]): WordCard[] {
    const wordCards = WordObjectConverter.convertWordsToWordCards(words);
    const shuffledWordCards = wordCards.sort(() => Math.random() - 0.5);
    return shuffledWordCards;
  }

  public click() {
      // check if flippable
      // check if matched -> check if finished
  }

  public checkIfMatched() {}

  public checkIfFlippable() {}

  public checkIfFinished() {}
}
