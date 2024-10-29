import { AsyncPipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  concat,
  concatMap,
  delay,
  finalize,
  interval,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.getNextLine();
    }
  }

  private cancelTimer$ = new Subject<void>();

  npc = {
    id: 'npc-1',
    dialog: [
      {
        text: 'hello <div>first</div> line',
        speed: 100,
        continuePrompt: true,
        triggerAction: 'TriggerCustomAction',
      },
      {
        text: 'hihihi',
        speed: 20,
        startDelay: 0,
        continuePrompt: false,
      },
      {
        text: '<div>second</div> line',
        speed: 200,
        startDelay: 900,
        triggerAction: 'TriggerCustomAction',
        keepPrevious: true,
      },
      {
        text: 'done <div>third</div> line',
        speed: 100,
        continuePrompt: true,
        triggerAction: 'TriggerCustomAction',
      },
    ],
  };

  currentDialogIndex = 0;
  output$ = of('');
  inProgress = false;
  interval$: Observable<number> = of(0);
  showPrompt = false;

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping() {
    const dialog = this.npc.dialog[this.currentDialogIndex];
    let output = '';
    this.showPrompt = false;

    const speed = dialog.speed || 50;

    if (dialog.keepPrevious) {
      output = this.npc.dialog[this.currentDialogIndex - 1].text;
    }

    const dialogText = this.npc.dialog[this.currentDialogIndex].text;
    let currentIndex = 0;

    ///
    const i = setInterval(() => {
      console.log('xi');
    }, speed);
    clearInterval(i);

    ///

    this.output$ = interval(speed).pipe(
      takeUntil(this.cancelTimer$),
      delay(dialog.startDelay ?? 0),
      switchMap(() => {
        output += dialogText[currentIndex];
        currentIndex++;

        if (currentIndex === dialogText.length) {
          this.cancelTimer$.next();
          // return of(dialogText);
        }

        if (this.cancelTimer$.closed) {
          console.log('closed');
        }

        return of(output);
      }),
      finalize(() => {
        if (!dialog.continuePrompt) {
          console.log('auto get next');
          this.getNextLine();
        } else {
          this.showPrompt = true;
        }
      })
    );
  }

  getNextLine() {
    if (this.currentDialogIndex < this.npc.dialog.length - 1) {
      this.cancelTimer$.next();
      this.cancelTimer$ = new Subject<void>();
      this.currentDialogIndex++;
      this.startTyping();
    } else {
      console.log('close dialog box');
    }
  }
}
