import {
  ComponentRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { DialogStore } from './store/dialog.store';
import { dialogConfig as defaultConfig } from './dialog.config';
import { Dialog, SpeechBubblePositionMapping } from './store/dialog.model';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export type DialogControls = {
  select: () => void;
  next: () => void;
  previous: () => void;
};

@Injectable({ providedIn: 'root' })
export class GameDialogService {
  store = inject(DialogStore);
  controls: DialogControls = {
    select: () => {
      if (this.store.isPrinting()) {
        this.store.rushPrinting();
      } else {
        if (!this.store.currentSentence()?.prompts) {
          this.openDialogRef?.instance.endSentence();
        } else {
          const prompt =
            this.store.currentSentence()?.prompts?.[
              this.store.selectedPromptIndex()
            ];
          this.openDialogRef?.instance.runSentenceAction(prompt);
        }
      }
    },
    next: () => this.store.updatePromptSelection(1),
    previous: () => this.store.updatePromptSelection(-1),
  };
  vcr: ViewContainerRef | null = null;
  openDialogRef:
    | ComponentRef<SpeechBubbleComponent | DialogBoxComponent>
    | undefined;

  loadConfig(vcr: ViewContainerRef, config = defaultConfig) {
    this.store.updateConfig(config);
    this.vcr = vcr;

    return this.controls;
  }

  startDialog(dialog: Dialog, positionMapping: SpeechBubblePositionMapping) {
    if (!this.store.isDialogActive()) {
      this.store.updateDialog(dialog, positionMapping);
      this.openDialog();
    }
  }

  openDialog() {
    const sentence = this.store.currentSentence();

    if (sentence?.showOnSpeechBubble) {
      this.openDialogRef = this.vcr?.createComponent(SpeechBubbleComponent);
    } else {
      this.openDialogRef = this.vcr?.createComponent(DialogBoxComponent);
    }
  }

  endCurrentBoxSentence(nextIndex?: number) {
    this.store.nextSentence(nextIndex);

    const nextSentence = this.store.currentSentence();

    if (!nextSentence) {
      this.store.endDialog();
      this.openDialogRef?.destroy();
    }

    if (nextSentence?.showOnSpeechBubble) {
      this.openDialogRef?.destroy();
      this.openDialog();
    }
  }

  endCurrentBubbleSentence() {
    this.openDialogRef?.destroy();
    this.store.nextSentence();

    if (this.store.currentSentence()) {
      this.openDialog();
    } else {
      this.store.endDialog();
    }
  }
}
