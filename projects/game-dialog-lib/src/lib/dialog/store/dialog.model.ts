export type Sentence = {
  text: string;
  speaker?: string;
  startDelay?: number;
  typingDelay?: number;
  gameAction?: { beforeSentence?: () => void; afterSentence?: () => void };
  prompts?: { label: string; action?: () => void; nextIndex?: number }[];
  chainNext?: boolean;
  startOnNewLine?: boolean;
  showOnSpeechBubble?: boolean;
  classes?: string[];

  /** Will finish the dialog after the current sentence ends. */
  endDialog?: boolean;
};

export type Dialog = {
  id: string;
  sentences: Sentence[];
  containerClass?: string;
  positionMapping?: SpeechBubblePositionMapping;
  gameAction?: { beforeDialog?: () => void; afterDialog?: () => void };
};

export type SpeechBubblePositionMapping = {
  [speaker: string]: { x: number; y: number };
};
