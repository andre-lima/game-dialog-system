import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Dialog } from './dialog.model';
import { computed, effect } from '@angular/core';
import { dialogConfig } from '../dialog.config';

type DialogState = {
  config: typeof dialogConfig;
  dialog: Dialog | null;
  sentenceIndex: number;
  output: string;
  previousOutput: string;
  isPrinting: boolean;
  slowOutput: boolean;
  isFinished: boolean;
};

const initialState: DialogState = {
  config: dialogConfig,
  dialog: null,
  sentenceIndex: 0,
  output: '',
  previousOutput: '',
  isPrinting: true,
  slowOutput: true,
  isFinished: false,
};

export const DialogStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    currentSentence: computed(() => {
      const newSentence =
        store.dialog()?.sentences[store.sentenceIndex()] || null;

      return newSentence;
    }),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const sentence = store.currentSentence();
        sentence?.gameAction?.beforeSentence?.();
      });
    },
  }),
  withMethods((store) => ({
    updateConfig(config: typeof dialogConfig): void {
      patchState(store, (state) => ({ ...state, config }));
    },
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
      patchState(store, (state) => {
        const nextIndex = nextSentenceIndex ?? state.sentenceIndex + 1;
        return {
          ...state,
          previousOutput: store.currentSentence()?.chainNext
            ? state.previousOutput + state.output
            : '',
          output: '',
          sentenceIndex: nextIndex,
          isPrinting: true,
          slowOutput: true,
        };
      });
    },
    updateDialog(dialog: Dialog): void {
      patchState(store, (state) => {
        return { ...state, dialog };
      });
    },
    endDialog(): void {
      patchState(store, (state) => ({
        ...state,
        isFinished: true,
      }));
    },
    updateOutput(index: number): void {
      const sentence = store.currentSentence();
      const splitText = [
        sentence?.text.slice(0, index),
        sentence?.text.slice(index),
      ];

      patchState(store, (state) => ({
        ...state,
        output: `<span class="${(sentence?.classes || []).join(' ')}">${
          splitText[0]
        }</span><span class="hidden">${splitText[1]}</span> `,
      }));
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
