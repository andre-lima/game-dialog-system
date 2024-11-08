export type DialogConfig = {
  fontSize: {
    wideDialog: number;
    speechBubble: number;
  };
  dialogBackground: {
    wideDialog: string;
    speechBubble: string;
  };
  speakerNames: { [id: string]: string };
  speakerAvatar: { [id: string]: string };
  wideDialog: {
    position: { x: number; y: number };
    width: string;
  };
  speechBubble: {
    positionOffset: { x: number; y: number };
  };
  defaultTypingDelay: number;
  defaultStartDelay: number;
  prompt: {
    defaultPromptMessage: string;
    promptIcon: string;
    blinkIcon: false;
  };
};

export const dialogConfig: DialogConfig = {
  fontSize: {
    wideDialog: 18,
    speechBubble: 16,
  },
  dialogBackground: {
    wideDialog: '',
    speechBubble: '',
  },
  speakerNames: {},
  speakerAvatar: {},
  wideDialog: {
    position: { x: 0, y: 10 },
    width: '100%',
  },
  speechBubble: {
    positionOffset: { x: 0, y: -20 },
  },
  defaultTypingDelay: 50,
  defaultStartDelay: 10,
  prompt: {
    defaultPromptMessage: 'Next',
    promptIcon: '',
    blinkIcon: false,
  },
};
