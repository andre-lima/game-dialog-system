import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
  output,
} from '@angular/core';
import { DialogStore } from '../store/dialog.store';
import { dialogConfig } from '../dialog.config';
import { TypewriterEffectComponent } from '../typewriter-effect/typewriter-effect.component';
import { GameDialogService } from '../dialog.service';

@Component({
  selector: 'dialog-box',
  standalone: true,
  imports: [CommonModule, TypewriterEffectComponent],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBoxComponent {
  store = inject(DialogStore);
  service = inject(GameDialogService);

  dialogBoxPosition = computed(() => {
    return dialogConfig.wideDialog.position;
  });

  runSentenceAction(prompt: any) {
    prompt.action();
    this.service.endCurrentBoxSentence(prompt.nextIndex);
  }

  endSentence() {
    this.service.endCurrentBoxSentence();
  }
}
