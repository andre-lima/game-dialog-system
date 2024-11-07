export type Sentence = {
  text: string;
  speaker?: string;
  startDelay?: number;
  typingDelay?: number;
  gameAction?: { beforeSentence?: () => void; afterSentence?: () => void };
  prompts?: { label?: string; action?: () => void; nextIndex?: number }[];
  chainNext?: boolean;
  showOnSpeechBubble?: boolean;
  classes?: string[];
};

export type Dialog = {
  id: string;
  sentences: Sentence[];
  positionMapping?: SpeechBubblePositionMapping;
  gameAction?: { beforeDialog?: () => void; afterDialog?: () => void };
};

export type SpeechBubblePositionMapping = {
  [speaker: string]: { x: number; y: number };
};
