import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { DialogStore } from '../store/dialog.store';
import { dialogConfig } from '../dialog.config';
import { TypewriterEffectComponent } from '../typewriter-effect/typewriter-effect.component';
import { GameDialogService } from '../dialog.service';

@Component({
  selector: 'dialog-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-prompt.component.html',
  styleUrl: './dialog-prompt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogPromptComponent {
  position = input<{ x: number; y: number }>();
}
