import { Dialog } from '../../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';

export const dialogs: Dialog[] = [
  {
    id: 'npc-1',
    sentences: [
      {
        text: 'Hello, and...',
        speaker: 'first-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
        classes: ['success', 'blink'],
      },
      {
        text: 'Welcome to my Dialog...',
        startDelay: 800,
        speaker: 'second-dude',
        gameAction: {
          beforeSentence: () => console.log('WELCOME'),
        },
        chainNext: true,
      },
      // {
      //   text: '(wait for it)',
      //   startDelay: 500,
      //   classes: ['small'],
      //   chainNext: true,
      // },
      // {
      //   text: 'SYSTEM!',
      //   startDelay: 1000,
      //   typingDelay: 1000,
      //   classes: ['success', 'blink'],
      // },
      // {
      //   text: 'hey',
      //   startDelay: 500,
      //   chainNext: true,
      //   classes: ['bold', 'alert'],
      // },
      // {
      //   text: '. . . . . .',
      //   chainNext: true,
      //   classes: ['bold', 'alert'],
      // },
      // {
      //   text: 'You can also press Space during a long string to output the whole text.',
      //   typingDelay: 200,
      // },
      {
        text: 'And you can pass custom prompts to answer questions or branch conversations.',
        speaker: 'second-dude',
        typingDelay: 15,
        prompts: [
          {
            label: 'Say hi and go to beginning',
            action: () => {
              console.log('Hi!');
            },
            nextIndex: 0,
          },
          {
            label: 'Say bye and end dialog',
            action: () => {
              console.log('Bye!');
            },
          },
          {
            label: '3rd option',
            action: () => {
              console.log('3333333');
            },
          },
        ],
      },
    ],
  },
  {
    id: 'npc-2',
    sentences: [
      {
        text: '22222 Hello, and...',
        speaker: 'first-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
    ],
  },
  {
    id: 'npc-3',
    sentences: [
      {
        text: 'ping... ',
        typingDelay: 100,
        speaker: 'first-dude',
        showOnSpeechBubble: true,
        chainNext: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'chained',
        typingDelay: 100,
        speaker: 'first-dude',
        showOnSpeechBubble: true,
        gameAction: {
          beforeSentence: () => console.log('before sentence'),
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'pong... x: 300',
        speaker: 'second-dude',
        classes: ['blink', 'success'],
        showOnSpeechBubble: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'ping... x: 100',
        speaker: 'first-dude',
        showOnSpeechBubble: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'and so they continued',
        chainNext: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: '... for a while',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'and a while',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'pong... x: 300',
        speaker: 'second-dude',
        showOnSpeechBubble: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
    ],
  },
];
