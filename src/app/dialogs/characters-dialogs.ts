import { emulateTab } from 'emulate-tab';

export const charactersDialogs: {
  [id: string]: { read: number; dialogIds: string[] };
} = {
  girl1: { read: 0, dialogIds: ['girl1-intro', 'girl1-mid', 'girl1-last'] },
  boy1: { read: 0, dialogIds: ['boy1-intro', 'boy1-mid', 'boy1-last'] },
};

// Needs some logic to choose which dialog to display.
// eg: Loops through until last, Conditionally (repeats one until you do something), etc.

// setInterval(() => {
// emulateTab();
// emulateTab.backwards();
// }, 1000);

addEventListener('keydown', (event) => {
  console.log(event);
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    emulateTab.forwards();
  } else {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      emulateTab.backwards();
    }
  }
});
