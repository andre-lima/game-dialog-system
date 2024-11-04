import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  effect,
  HostListener,
  inject,
  untracked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogStore } from './store/dialog.store';
import { Dialog } from './store/dialog.model';
import { dialogConfig } from './dialog.config';

@Component({
  selector: 'game-dialog',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [DialogStore],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      if (!this.store.isPrinting()) {
        this.store.nextSentence();
      } else {
        this.rushOutput();
      }
    } else if (event.key === '`') {
      this.store.endDialog();
    } else if (event.key === 'd') {
      console.log(this.store.dialog());
    }
  }

  store = inject(DialogStore);
  componentRef?: ComponentRef<GameDialogComponent>;

  currentSpeaker = computed(() => {
    return this.store.currentSentence()?.speaker;
  });

  dialogBoxPosition = computed(() => {
    const speaker = this.currentSpeaker() || '';
    const speakerPosition = this.store.dialog()?.position?.[speaker];

    return speakerPosition || dialogConfig.wideDialog.position;
  });

  isBubbleDialog = computed(() => {
    const speaker = this.currentSpeaker() || '';

    return this.store.dialog()?.position?.[speaker];
  });

  constructor() {
    effect(() => {
      const isFinished = this.store.isFinished();
      if (!isFinished) {
        this.store.dialog()?.gameAction?.beforeDialog?.();
      } else {
        this.store.dialog()?.gameAction?.afterDialog?.();
        this.closeDialog();
      }
    });

    effect(
      async () => {
        const sentence = this.store.currentSentence();

        if (!sentence) {
          this.store.endDialog();
          return;
        }

        await delay(sentence.startDelay ?? dialogConfig.defaultStartDelay);

        for (
          let splitIndex = 0;
          splitIndex <= sentence.text.length;
          splitIndex++
        ) {
          this.store.updateOutput(splitIndex);
          if (untracked(this.store.slowOutput)) {
            await delay(
              sentence.typingDelay ?? dialogConfig.defaultTypingDelay
            );
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

  openDialog(dialog: Dialog, ref: ComponentRef<GameDialogComponent>) {
    this.componentRef = ref;
    this.store.updateDialog(dialog);
  }

  closeDialog() {
    this.componentRef?.destroy();
  }

  rushOutput() {
    this.store.rushPrinting();
  }

  runSentenceCallback(cb: any, nextIndex?: number) {
    cb();
    this.store.nextSentence(nextIndex);
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
