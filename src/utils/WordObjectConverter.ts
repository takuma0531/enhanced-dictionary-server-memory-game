import { Word, WordCard } from "../typings/word";

export class WordObjectConverter {
  public static convertWordsToWordCards(words: Word[]): WordCard[] {
    let wordCards: WordCard[] = [];
    words.map((word: Word) => {
      wordCards.push({ id: word.id, text: word.detectedText });
      wordCards.push({ id: word.id, text: word.targetText });
    });
    return wordCards;
  }
}
