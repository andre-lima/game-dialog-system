export type Sentence = {
  text: string;
  speaker?: string;
  startDelay?: number;
  typingDelay?: number;
  gameAction?: { beforeSentence?: () => void; afterSentence?: () => void };
  prompts?: { label?: string; action?: () => void; nextIndex?: number }[];
  chainNext?: boolean;
  classes?: string[];
};

export type Dialog = {
  id: string;
  gameAction?: { beforeDialog?: () => void; afterDialog?: () => void };
  sentences: Sentence[];
};