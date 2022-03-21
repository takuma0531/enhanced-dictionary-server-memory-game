import { Word, WordCard } from "../typings/word";

export class WordObjectConverter {
  public static convertWordsToWordCards(words: Word[]): WordCard[] {
    let wordCards: WordCard[] = [];
    words.map((word: Word, index: number) => {
      wordCards.push({ id: word.id, orderId: index, text: word.detectedText });
      wordCards.push({
        id: word.id,
        orderId: index + 1,
        text: word.targetText,
      });
    });
    return wordCards;
  }
}
