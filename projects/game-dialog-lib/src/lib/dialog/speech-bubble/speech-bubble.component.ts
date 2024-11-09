import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { DialogStore } from '../store/dialog.store';
import { dialogConfig } from '../dialog.config';
import { TypewriterEffectComponent } from '../typewriter-effect/typewriter-effect.component';
import { GameDialogService } from '../dialog.service';

@Component({
  selector: 'speech-bubble',
  standalone: true,
  imports: [CommonModule, TypewriterEffectComponent],
  templateUrl: './speech-bubble.component.html',
  styleUrl: './speech-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SpeechBubbleComponent {
  store = inject(DialogStore);
  service = inject(GameDialogService);

  dialogBoxPosition = computed(() => {
    const speaker = this.store.currentSentence()?.speaker || '';
    const speakerPosition = this.store.speechBubblePositions()?.[speaker];

    return speakerPosition || dialogConfig.wideDialog.position;
  });

  runSentenceAction() {}

  endSentence() {
    this.service.endCurrentBubbleSentence();
  }
}
