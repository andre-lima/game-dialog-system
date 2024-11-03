import { Dialog } from '../../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';

export const dialogs: Dialog[] = [
  {
    id: 'npc-1',
    gameAction: {
      beforeDialog: () => console.log('Start of dialog'),
      afterDialog: () => console.log('End of dialog'),
    },
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
        prompts: [
          {
            label: 'Say hi and to go beginning',
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
        ],
      },
    ],
  },
  {
    id: 'npc-2',
    gameAction: {
      beforeDialog: () => console.log('Start of dialog 2'),
      afterDialog: () => console.log('End of dialog 2'),
    },
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
    gameAction: {
      beforeDialog: () => console.log('Start of dialog 2'),
      afterDialog: () => console.log('End of dialog 2'),
    },
    position: {
      'first-dude': { x: 100, y: 300 },
      'second-dude': { x: 300, y: 400 },
    },
    sentences: [
      {
        text: 'ping... x: 100',
        speaker: 'first-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'pong... x: 300',
        speaker: 'second-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'ping... x: 100',
        speaker: 'first-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'and so they continued',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'pong... x: 300',
        speaker: 'second-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
    ],
  },
];
