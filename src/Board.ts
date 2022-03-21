import { Word, WordCard } from "./typings/word";
import { WordObjectConverter } from "./utils/WordObjectConverter";

export class Board {
  private _elapsedTime: number;
  public cards: WordCard[];
  private _matches: WordCard[];
  private _selectedCards: WordCard[];

  constructor(words: Word[]) {
    this._elapsedTime = 0;
    this.cards = this.shuffle(words);
    this._matches = [];
    this._selectedCards = [];
  }

  private shuffle(words: Word[]): WordCard[] {
    const wordCards = WordObjectConverter.convertWordsToWordCards(words);
    let shuffledWordCards = wordCards.sort(() => Math.random() - 0.5);
    shuffledWordCards = wordCards.map((wordCard: WordCard, index: number) => {
      wordCard.orderId = index;
      return wordCard;
    });
    return shuffledWordCards;
  }

  public click(wordCardOrderId: number): WordCard[] {
    const clickedCard = this.cards.find(
      (card) => card.orderId == wordCardOrderId
    );
    if (
      !clickedCard ||
      !this.checkIfFlippable(wordCardOrderId) ||
      this._selectedCards.length >= 2
    )
      return this._selectedCards;

    this._selectedCards.push(clickedCard);
    return this._selectedCards;
  }

  public checkIfMatched(): boolean {
    const [first, second] = this._selectedCards;
    const isMatched = first.id == second.id;

    this._selectedCards = [];
    isMatched && this._matches.push(first, second);
    return isMatched;
  }

  public checkIfFlippable(wordCardOrderId: number): boolean {
    const isSelectedCard = this._selectedCards.some(
      (selectedCard) => selectedCard.orderId == wordCardOrderId
    );
    const isAlreadyMatched = this._matches.some(
      (wordCard) => wordCard.orderId == wordCardOrderId
    );
    return !(isSelectedCard || isAlreadyMatched);
  }

  public checkIfFinished(): boolean {
    return this._matches.length == this.cards.length;
  }
}
