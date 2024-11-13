import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';

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
