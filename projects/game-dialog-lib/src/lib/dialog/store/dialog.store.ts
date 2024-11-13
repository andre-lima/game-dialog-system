import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Dialog, SpeechBubblePositionMapping } from './dialog.model';
import { computed, effect } from '@angular/core';
import { dialogConfig } from '../dialog.config';

type DialogState = {
  config: typeof dialogConfig;
  dialog: Dialog | null;
  speechBubblePositions: SpeechBubblePositionMapping | null;
  sentenceIndex: number;
  output: string;
  previousOutput: string;
  isPrinting: boolean;
  slowOutput: boolean;
  isDialogActive: boolean;
  isPromptActive: boolean;
  selectedPromptIndex: number;
};

const initialState: DialogState = {
  config: dialogConfig,
  dialog: null,
  speechBubblePositions: null,
  sentenceIndex: 0,
  output: '',
  previousOutput: '',
  isPrinting: false,
  slowOutput: true,
  isDialogActive: false,
  isPromptActive: false,
  selectedPromptIndex: 0,
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
    currentSpeaker: computed(() => {
      const newSpeaker =
        store.dialog()?.sentences[store.sentenceIndex()].speaker;

      return newSpeaker;
    }),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const sentence = store.currentSentence();

        if (sentence) {
          sentence.gameAction?.beforeSentence?.();
        }
      });
    },
  }),
  withMethods((store) => ({
    updateConfig(config: typeof dialogConfig): void {
      patchState(store, (state) => ({ ...state, config }));
    },
    endPrinting(): void {
      patchState(store, (state) => ({
        ...state,
        isPrinting: false,
      }));
    },
    rushPrinting(): void {
      patchState(store, (state) => ({
        ...state,
        slowOutput: false,
      }));
    },
    updateDialogPrompt(isOpen: boolean): void {
      patchState(store, (state) => ({
        ...state,
        isPromptActive: isOpen,
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
          selectedPromptIndex: 0,
          isPrinting: true,
          slowOutput: state.slowOutput || !store.currentSentence()?.chainNext,
        };
      });
    },
    updateDialog(
      dialog: Dialog,
      positionMapping?: SpeechBubblePositionMapping
    ): void {
      patchState(store, (state) => {
        return {
          ...state,
          dialog,
          sentenceIndex: 0,
          speechBubblePositions: positionMapping,
          isPrinting: true,
          isDialogActive: true,
        };
      });
    },
    endDialog(): void {
      patchState(store, (state) => ({
        ...state,
        isDialogActive: false,
        isPrinting: false,
      }));
    },
    updatePromptSelection(shift: 1 | -1) {
      patchState(store, (state) => {
        const promptLength = store.currentSentence()?.prompts?.length || 0;
        let newSelectedIndex = state.selectedPromptIndex + shift;

        if (newSelectedIndex < 0) {
          newSelectedIndex = promptLength - 1;
        } else if (newSelectedIndex >= promptLength) {
          newSelectedIndex = 0;
        }

        return {
          ...state,
          selectedPromptIndex: newSelectedIndex,
        };
      });
    },
    updateOutput(index: number): void {
      const sentence = store.currentSentence();
      const splitText = [
        sentence?.text.slice(0, index),
        sentence?.text.slice(index),
      ];
      const lineBreak = sentence?.startOnNewLine ? '<br />' : '';

      patchState(store, (state) => ({
        ...state,
        output: `${lineBreak}<span class="${(sentence?.classes || []).join(
          ' '
        )}">${splitText[0]}</span><span class="hidden">${splitText[1]}</span> `,
      }));
    },
  }))
);
