import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
  untracked,
} from '@angular/core';
import { DialogStore } from '../store/dialog.store';
import { GameDialogService } from '../dialog.service';
import { Sentence } from '../store/dialog.model';

@Component({
  selector: 'typewriter-effect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typewriter-effect.component.html',
  styleUrl: './typewriter-effect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypewriterEffectComponent {
  store = inject(DialogStore);
  service = inject(GameDialogService);
  cancelDelay: (value: unknown) => void = (x) => {};

  constructor() {
    effect(() => {
      if (!this.store.slowOutput()) {
        this.cancelDelay?.(true);
      }
    });
    effect(
      async () => {
        const sentence = this.store.currentSentence();
        const config = this.store.config();

        if (!sentence) {
          return;
        }

        if (untracked(() => this.store.slowOutput())) {
          await this.delay(sentence.startDelay ?? config?.defaultStartDelay);
        }

        for (
          let splitIndex = 0;
          splitIndex <= sentence.text.length;
          splitIndex++
        ) {
          if (untracked(() => this.store.slowOutput())) {
            this.store.updateOutput(splitIndex);
            await this.delay(sentence.typingDelay ?? config.defaultTypingDelay);
          } else {
            break;
          }
        }

        this.endSentence(sentence);
      },
      { allowSignalWrites: true }
    );
  }

  endSentence(sentence: Sentence) {
    this.store.updateOutput(sentence.text.length);

    if (sentence.chainNext) {
      this.store.nextSentence();
    } else {
      this.store.endPrinting();
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => {
      this.cancelDelay = resolve;

      return setTimeout(resolve, ms);
    });
  }
}
