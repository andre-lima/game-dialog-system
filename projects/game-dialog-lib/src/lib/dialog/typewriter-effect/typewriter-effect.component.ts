import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { Dialog, Sentence } from '../store/dialog.model';
import { DialogStore } from '../store/dialog.store';
import { dialogConfig } from '../dialog.config';
import { GameDialogService } from '../dialog.service';

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

  constructor() {
    effect(
      async () => {
        const sentence = this.store.currentSentence();
        const config = this.store.config();

        if (!sentence) {
          return;
        }

        await delay(sentence.startDelay ?? config?.defaultStartDelay);

        for (
          let splitIndex = 0;
          splitIndex <= sentence.text.length;
          splitIndex++
        ) {
          this.store.updateOutput(splitIndex);
          if (this.store.slowOutput()) {
            await delay(sentence.typingDelay ?? config.defaultTypingDelay);
          } else {
            this.store.updateOutput(sentence.text.length);
            break;
          }
        }

        if (sentence.chainNext) {
          this.store.nextSentence();
        } else {
          this.store.endPrinting();
        }
      }
      // { allowSignalWrites: true }
    );
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
