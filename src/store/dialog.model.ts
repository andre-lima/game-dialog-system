export type Sentence = {
  text: string;
  startDelay?: number;
  characterDelay?: number;
  actions?: { label: string; callback: () => void }[];
  chainNext?: boolean;
  classes?: string[];
};

export type Dialog = {
  id: string;
  sentences: Sentence[];
};
