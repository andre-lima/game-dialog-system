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
import { DialogStore } from '../../store/dialog.store';
import { Dialog } from '../../store/dialog.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [DialogStore],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
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

  npc: Dialog = {
    id: 'npc-1',
    gameAction: {
      beforeDialog: () => console.log('Start of dialog'),
      afterDialog: () => console.log('End of dialog'),
    },
    sentences: [
      {
        text: 'Hello, and...',
        speaker: 'first-dude',
        gameAction: {
          afterSentence: () => console.log('All cleaned...'),
        },
      },
      {
        text: 'Welcome to my Dialog...',
        speaker: 'second-dude',
        gameAction: {
          beforeSentence: () => console.log('WELCOME'),
        },
        chainNext: true,
      },
      // {
      //   text: '(wait for it)',
      //   startDelay: 500,
      //   classes: ['small'],
      //   chainNext: true,
      // },
      // {
      //   text: 'SYSTEM!',
      //   startDelay: 1000,
      //   typingDelay: 1000,
      //   classes: ['success', 'blink'],
      // },
      // {
      //   text: 'hey',
      //   startDelay: 500,
      //   chainNext: true,
      //   classes: ['bold', 'alert'],
      // },
      // {
      //   text: '. . . . . .',
      //   chainNext: true,
      //   classes: ['bold', 'alert'],
      // },
      // {
      //   text: 'You can also press Space during a long string to output the whole text.',
      //   typingDelay: 200,
      // },
      {
        text: 'And you can pass custom prompts to answer questions or branch conversations.',
        prompts: [
          {
            label: 'Say hi and to go beginning',
            action: () => {
              alert('Hi!');
            },
            nextIndex: 0,
          },
          {
            label: 'Say bye and end dialog',
            action: () => {
              alert('Bye!');
            },
          },
        ],
      },
    ],
  };

  constructor() {
    effect(
      async () => {
        const sentence = this.store.currentSentence();

        if (!sentence) {
          this.store.endDialog();
          return;
        }

        await delay(sentence.startDelay ?? 0);

        for (
          let splitIndex = 0;
          splitIndex <= sentence.text.length;
          splitIndex++
        ) {
          this.store.updateOutput(splitIndex);
          if (untracked(this.store.slowOutput)) {
            await delay(sentence.typingDelay ?? 50);
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

  async ngOnInit() {
    this.store.updateDialog(this.npc);
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
