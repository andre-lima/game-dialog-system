import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  HostListener,
  inject,
  OnInit,
  untracked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogStore } from '../store/dialog.store';
import { Dialog } from '../store/dialog.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [DialogStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      if (!this.store.isPrinting()) {
        this.store.nextSentence();
      } else {
        this.rushOutput();
      }
    } else if (event.key === '`') {
      console.log('quit dialog');
    }
  }

  store = inject(DialogStore);

  npc: Dialog = {
    id: 'npc-1',
    sentences: [
      {
        text: 'hello first line',
      },
      {
        text: 'hiddddddddd',
        chainNext: true,
      },
      {
        text: 'hixxxxxxxxxxx',
        characterDelay: 620,
        startDelay: 440,
        chainNext: true,
        classes: ['bold', 'alert'],
      },
      {
        text: 'hicccccccccc',
        characterDelay: 20,
        startDelay: 300,
        chainNext: true,
      },
      {
        text: 'second line',
        characterDelay: 200,
        startDelay: 1000,
        actions: [
          {
            label: 'TriggerCustomAction',
            callback: () => {
              console.log('action triggered');
            },
          },
        ],
        chainNext: true,
      },
      {
        text: 'done last line',
        characterDelay: 100,
      },
    ],
  };

  constructor() {
    effect(async () => {
      const sentence = this.store.currentSentence();

      const splitText = sentence.text.split('');

      await delay(sentence.startDelay ?? 0);

      for (const c of splitText) {
        this.store.addToOutput(c);
        if (untracked(this.store.slowOutput)) {
          await delay(sentence.characterDelay ?? 50);
        }
      }

      if (!sentence.chainNext || sentence.actions) {
        this.store.endPrinting();
      } else {
        this.store.nextSentence();
      }
    });
  }

  async ngOnInit() {
    this.store.updateDialog(this.npc);
  }

  rushOutput() {
    this.store.rushPrinting();
  }

  runSentenceCallback(cb: any) {
    cb();
    this.store.nextSentence();
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
