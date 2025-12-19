
export enum MessageAuthor {
  USER = 'user',
  MODEL = 'model',
  ASSISTANT = 'assistant',
}

export interface ChatMessage {
  author: MessageAuthor;
  text: string;
  type?: 'hint' | 'correct' | 'incorrect' | 'summary';
}
