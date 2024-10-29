import { AsyncPipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
      if (this.isBufferEmpty) {
        this.getNextLine();
      } else {
        this.rushOutput();
      }
    }
  }

  npc = {
    id: 'npc-1',
    dialog: [
      {
        text: 'hello <div>first</div> line',
        delay: 100,
        continuePrompt: true,
        triggerAction: 'TriggerCustomAction',
      },
      {
        text: 'hi',
        delay: 20,
        startDelay: 0,
        continuePrompt: false,
      },
      {
        text: 'hi',
        delay: 20,
        startDelay: 800,
        continuePrompt: false,
        keepPrevious: true,
      },
      {
        text: 'hi',
        delay: 20,
        startDelay: 800,
        continuePrompt: false,
        keepPrevious: true,
      },
      {
        text: '<div>second</div> line',
        delay: 200,
        startDelay: 2000,
        triggerAction: 'TriggerCustomAction',
        keepPrevious: true,
        continuePrompt: true,
      },
      {
        text: 'done <div>third</div> linedone <div>third</div> linedone <div>third</div> linedone <div>third</div> line',
        delay: 100,
        continuePrompt: true,
        triggerAction: 'TriggerCustomAction',
      },
    ],
  };

  dialogIndex = 0;
  currentDialog = this.npc.dialog[0];
  output = '';
  fullText = '';
  isBufferEmpty = true;

  async ngOnInit() {
    this.addToOutput();
  }

  addToOutput() {
    const dialog = this.currentDialog;
    this.fullText += dialog.text;
    this.addToBuffer(dialog);
  }

  async addToBuffer(dialog: (typeof this.npc.dialog)[0]) {
    this.isBufferEmpty = false;
    const splitText = dialog.text.split('');

    await delay(dialog.startDelay ?? 0);

    for (const c of splitText) {
      this.output += c;
      if (dialog.delay > 0) {
        await delay(dialog.delay);
      }
    }

    this.isBufferEmpty = true;

    if (!this.currentDialog.continuePrompt) {
      this.getNextLine();
    }
  }

  rushOutput() {
    this.currentDialog.delay = 0;
  }

  clearOutput() {
    if (!this.currentDialog.keepPrevious) {
      this.output = '';
      this.fullText = '';
    }
  }

  getNextLine() {
    this.dialogIndex++;
    this.currentDialog = this.npc.dialog[this.dialogIndex];

    if (this.currentDialog) {
      this.clearOutput();
      this.addToOutput();
    } else {
      console.log('done');
    }
  }
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
