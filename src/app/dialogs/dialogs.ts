import { Dialog } from '../../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';

export const shouldShowOption = (promptId: string) => {
  console.log(promptId);

  return Math.random() > 0.5;
};

export const dialogs: Dialog[] = [
  {
    id: 'girl1-intro',
    sentences: [
      {
        text: 'Girl intro...',
        prompts: [
          {
            label: 'Say hi',
            action: () => {
              console.log('Hi');
            },
          },
          {
            label: 'Conditional: 50% chance of showing',
            action: () => {
              console.log('i was lucky to show up');
            },
            conditional: () => shouldShowOption('cond_prompt'),
          },
        ],
      },
    ],
  },
  {
    id: 'girl1-mid',
    sentences: [
      {
        text: 'Girl mid conversation',
      },
    ],
  },
  {
    id: 'girl1-last',
    sentences: [
      {
        text: 'Girl last... will repeat',
      },
    ],
  },
];
