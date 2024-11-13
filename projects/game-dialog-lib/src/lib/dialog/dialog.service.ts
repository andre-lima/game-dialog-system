import {
  ComponentRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { DialogStore } from './store/dialog.store';
import { dialogConfig as defaultConfig, DialogConfig } from './dialog.config';
import { Dialog, SpeechBubblePositionMapping } from './store/dialog.model';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';

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
  openPromptRef: ComponentRef<DialogPromptComponent> | undefined;

  loadConfig(vcr: ViewContainerRef, configOveride?: Partial<DialogConfig>) {
    this.store.updateConfig({ ...defaultConfig, ...configOveride });
    this.vcr = vcr;

    return this.controls;
  }

  isDialogActive() {
    return this.store.isDialogActive();
  }

  isDialogPromptActive() {
    return this.store.isPromptActive();
  }

  startDialog(dialog: Dialog, positionMapping: SpeechBubblePositionMapping) {
    if (!this.store.isDialogActive()) {
      this.closeDialogPrompt();
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

  openDialogPrompt(position: { x: number; y: number }) {
    this.openPromptRef = this.vcr?.createComponent(DialogPromptComponent);
    this.openPromptRef?.setInput('position', position);
    this.store.updateDialogPrompt(true);
  }

  closeDialogPrompt() {
    this.openPromptRef?.destroy();
    this.store.updateDialogPrompt(false);
  }

  endCurrentBoxSentence(nextIndex?: number) {
    if (this.store.currentSentence()?.endDialog) {
      this.store.endDialog();
      this.openDialogRef?.destroy();
      return;
    }

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

    if (this.store.currentSentence()?.endDialog) {
      this.store.endDialog();
      return;
    }

    this.store.nextSentence();

    if (this.store.currentSentence()) {
      this.openDialog();
    } else {
      this.store.endDialog();
    }
  }
}
