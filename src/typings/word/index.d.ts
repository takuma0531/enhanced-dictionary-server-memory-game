export interface Word {
  id: string;
  detectedText: string;
  targetText: string;
}

export interface WordCard {
  id: string;
  orderId: number;
  text: string;
}
