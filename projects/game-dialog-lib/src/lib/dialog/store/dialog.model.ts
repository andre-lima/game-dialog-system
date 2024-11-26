export type Sentence = {
  text: string;
  speaker?: string;
  startDelay?: number;
  typingDelay?: number;
  gameAction?: { beforeSentence?: () => void; afterSentence?: () => void };
  prompts?: SentencePrompts[];
  chainNext?: boolean;
  startOnNewLine?: boolean;
  showOnSpeechBubble?: boolean;
  classes?: string[];

  /** Will finish the dialog after the current sentence ends. */
  endDialog?: boolean;
};

export type SentencePrompts = {
  label: string;
  conditional?: () => boolean;
  action?: () => void;
  nextIndex?: number;
  nextDialog?: string;
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
