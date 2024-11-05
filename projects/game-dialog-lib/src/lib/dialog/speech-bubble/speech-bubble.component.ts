import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  computed,
  effect,
} from '@angular/core';
import { Dialog, Sentence } from '../store/dialog.model';
import { DialogStore } from '../store/dialog.store';
import { dialogConfig } from '../dialog.config';

@Component({
  selector: 'speech-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speech-bubble.component.html',
  styleUrl: './speech-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechBubbleComponent {
  // dialog = input<Dialog>();
  store = inject(DialogStore);
  output = computed(() => {
    console.log(this.store.output());
    this.store.updateOutput(3);
    return this.store.output();
  });

  constructor() {
    console.log('xxxx', this.store);
    // effect(() => {
    //   console.log(this.store.output());
    // });
  }
}
