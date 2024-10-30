import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Dialog } from './dialog.model';
import { computed } from '@angular/core';

type DialogState = {
  dialog: Dialog;
  sentenceIndex: number;
  output: string;
  previousOutput: string;
  isPrinting: boolean;
  slowOutput: boolean;
  isDone: boolean;
};

const initialState: DialogState = {
  dialog: { id: '', sentences: [] },
  sentenceIndex: 0,
  output: '',
  previousOutput: '',
  isPrinting: true,
  slowOutput: true,
  isDone: false,
};

export const DialogStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    currentSentence: computed(() => {
      return (
        store.dialog()?.sentences[store.sentenceIndex()] || {
          text: '',
        }
      );
    }),
  })),
  withMethods((store) => ({
    endPrinting(): void {
      patchState(store, (state) => ({ ...state, isPrinting: false }));
    },
    rushPrinting(): void {
      patchState(store, (state) => ({
        ...state,
        slowOutput: false,
        isPrinting: false,
      }));
    },
    nextSentence(nextSentenceIndex?: number): void {
      patchState(store, (state) => ({
        ...state,
        previousOutput: store.currentSentence().chainNext
          ? state.previousOutput + state.output
          : '',
        output: '',
        sentenceIndex: nextSentenceIndex ?? state.sentenceIndex + 1,
        isPrinting: true,
        slowOutput: true,
      }));
    },
    updateDialog(dialog: Dialog): void {
      patchState(store, (state) => ({ ...state, dialog }));
    },
    updateOutput(index: number): void {
      patchState(store, (state) => {
        const sentence = store.currentSentence();
        const splitText = [
          sentence.text.slice(0, index),
          sentence.text.slice(index),
        ];

        return {
          ...state,
          output: `<span class="${(sentence.classes || []).join(' ')}">${
            splitText[0]
          }</span><span class="hidden">${splitText[1]}</span> `,
        };
      });
    },
    clearOutput(): void {
      patchState(store, (state) => ({
        ...state,
        output: '',
        previousOutput: '',
      }));
    },
  }))
);
