import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Dialog, Sentence } from './dialog.model';
import { computed } from '@angular/core';

type DialogState = {
  dialog: Dialog;
  sentenceIndex: number;
  output: string;
  isPrinting: boolean;
  slowOutput: boolean;
  isDone: boolean;
};

const initialState: DialogState = {
  dialog: { id: '', sentences: [] },
  sentenceIndex: 0,
  output: '',
  isPrinting: true,
  slowOutput: true,
  isDone: false,
};

export const DialogStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    currentSentence: computed(() => {
      return store.dialog()?.sentences[store.sentenceIndex()] || { text: '' };
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
    nextSentence(): void {
      patchState(store, (state) => ({
        ...state,
        output: store.currentSentence().chainNext ? state.output : '',
        sentenceIndex: state.sentenceIndex + 1,
        isPrinting: true,
        slowOutput: true,
      }));
    },
    updateDialog(dialog: Dialog): void {
      patchState(store, (state) => ({ ...state, dialog }));
    },
    addToOutput(character: string): void {
      patchState(store, (state) => ({
        ...state,
        output: state.output + character,
      }));
    },
    clearOutput(): void {
      patchState(store, (state) => ({
        ...state,
        output: '',
      }));
    },
  }))
);
