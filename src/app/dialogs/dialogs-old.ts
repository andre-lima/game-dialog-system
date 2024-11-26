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
      {
        text: '(wait for it)',
        startDelay: 5000,
        classes: ['small'],
        startOnNewLine: true,
        chainNext: true,
      },
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
            label: 'Conditional: 50% chance of showing',
            action: () => {
              console.log('i was lucky to show up');
            },
          },
        ],
      },
      {
        typingDelay: 500,
        text: '. . . . . .',
        chainNext: true,
        classes: ['bold', 'alert'],
      },
      {
        text: 'You can also press Space during a long string to output the whole text.',
        typingDelay: 200,
      },
    ],
  },
  {
    id: 'robbery-scene',
    sentences: [
      {
        text: 'HANDS UP!',
        speaker: 'mean-thief',
        typingDelay: 30,
      },
      {
        text: 'This is a robbery...',
        speaker: 'mean-thief',
        chainNext: true,
      },
      {
        text: 'Veeeryyyy slowlyyyyy...',
        speaker: 'mean-thief',
        startDelay: 500,
        startOnNewLine: true,
        typingDelay: 200,
      },
      {
        text: 'HEEELPPP!',
        speaker: 'victim',
        showOnSpeechBubble: true,
      },
      {
        text: "I'm being robbed!",
        speaker: 'victim',
        showOnSpeechBubble: true,
      },
      {
        text: '',
        speaker: 'mean-thief',
        prompts: [
          {
            label: 'Shoot him',
            nextIndex: 6,
          },
          {
            label: 'Steal his shit',
            nextIndex: 7,
          },
          {
            label: 'Run',
            nextIndex: 8,
          },
        ],
      },
      {
        text: 'BANG!',
        showOnSpeechBubble: true,
        endDialog: true,
        speaker: 'mean-thief',
      },
      {
        text: 'Gimme that!',
        showOnSpeechBubble: true,
        speaker: 'mean-thief',
        endDialog: true,
      },
      {
        text: 'Not worth it...',
        speaker: 'mean-thief',
        showOnSpeechBubble: true,
      },
    ],
  },
  // {
  //   id: 'npc-2-bang',
  //   sentences: [
  //     {
  //       text: 'independent bang motherfucker... ',
  //     },
  //   ],
  // },
  {
    id: 'npc-3',
    sentences: [
      {
        text: 'ping... ',
        typingDelay: 100,
        speaker: 'mean-thief',
        showOnSpeechBubble: true,
        chainNext: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'chained',
        typingDelay: 100,
        speaker: 'mean-thief',
        showOnSpeechBubble: true,
        gameAction: {
          beforeSentence: () => console.log('before sentence'),
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'pong... x: 300',
        speaker: 'victim',
        classes: ['blink', 'success'],
        showOnSpeechBubble: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'ping... x: 100',
        speaker: 'mean-thief',
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
        speaker: 'victim',
        showOnSpeechBubble: true,
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
    ],
  },
];
