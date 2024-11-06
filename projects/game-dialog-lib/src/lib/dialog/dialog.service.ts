import {
  ComponentRef,
  effect,
  inject,
  Injectable,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { DialogStore } from './store/dialog.store';
import { dialogConfig as defaultConfig } from './dialog.config';
import { Dialog, SpeechBubblePositionMapping } from './store/dialog.model';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';

@Injectable({ providedIn: 'root' })
export class GameDialogService {
  store = inject(DialogStore);
  vcr: ViewContainerRef | null = null;
  openDialogRef: ComponentRef<SpeechBubbleComponent> | undefined;

  constructor() {
    effect(
      async () => {
        const sentence = this.store.currentSentence();
        const config = this.store.config();

        if (!sentence) {
          this.store.endDialog();
          return;
        }

        await delay(sentence.startDelay ?? config?.defaultStartDelay);

        for (
          let splitIndex = 0;
          splitIndex <= sentence.text.length;
          splitIndex++
        ) {
          this.store.updateOutput(splitIndex);
          if (untracked(this.store.slowOutput)) {
            await delay(sentence.typingDelay ?? config.defaultTypingDelay);
          } else {
            this.store.updateOutput(sentence.text.length);
            break;
          }
        }

        if (!sentence.chainNext || sentence.prompts) {
          this.store.endPrinting();
        } else {
          this.store.nextSentence();
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      // console.log(this.store.dialog());
      const sentence = this.store.currentSentence();
      if (!sentence) return;

      if (sentence?.continueOnPrevious) {
        return;
      }

      this.openDialogRef?.destroy();

      if (sentence?.showOnSpeechBubble) {
        console.log('create new bubble');
        this.openDialogRef = this.vcr?.createComponent(SpeechBubbleComponent);
      } else {
        console.log('create dialog box');
        this.openDialogRef = this.vcr?.createComponent(SpeechBubbleComponent);
      }
    });
  }

  loadConfig(vcr: ViewContainerRef, config = defaultConfig) {
    this.store.updateConfig(config);
    this.vcr = vcr;
  }

  startDialog(dialog: Dialog, positionMapping: SpeechBubblePositionMapping) {
    this.store.updateDialog(dialog, positionMapping);
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
