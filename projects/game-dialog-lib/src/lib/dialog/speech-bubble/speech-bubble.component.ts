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
  store = inject(DialogStore);

  constructor() {
    // effect(() => {
    //   console.log('curr speaker', this.store.currentSpeaker());
    // });
  }

  currentSpeaker = computed(() => {
    return this.store.currentSentence()?.speaker;
  });

  dialogBoxPosition = computed(() => {
    const speaker = this.currentSpeaker() || '';
    const speakerPosition = this.store.speechBubblePositions()?.[speaker];

    return speakerPosition || dialogConfig.wideDialog.position;
  });
}
