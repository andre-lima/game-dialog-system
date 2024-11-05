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
import { Dialog } from './store/dialog.model';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';

@Injectable({ providedIn: 'root' })
export class GameDialogService {
  store = inject(DialogStore);
  vcr: ViewContainerRef | null = null;

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
          console.log('x');
          if (untracked(this.store.slowOutput)) {
            console.log(sentence.typingDelay);
            console.log(config.defaultTypingDelay);
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
  }

  loadConfig(vcr: ViewContainerRef, config = defaultConfig) {
    this.store.updateConfig(config);
    this.vcr = vcr;
  }

  startDialog(dialog: Dialog) {
    this.store.updateDialog(dialog);
    this.vcr?.createComponent(SpeechBubbleComponent);

    // const speechComponent: ComponentRef<SpeechBubbleComponent> =
    //   this.container.createComponent(SpeechBubbleComponent);
    // dialogComponent.instance.openDialog(dialogs[index], dialogComponent);
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
