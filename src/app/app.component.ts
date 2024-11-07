import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { dialogs } from './dialogs/dialogs';
import { GameDialogService } from '../../projects/game-dialog-lib/src/lib/dialog/dialog.service';
import { SpeechBubblePositionMapping } from '../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';
import { DialogControls } from '../../dist/game-dialog-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  controls: DialogControls;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.controls.select();
    } else if (event.key === 'ArrowRight') {
      this.controls.next();
    } else if (event.key === 'ArrowLeft') {
      this.controls.previous();
    }
  }

  dialogService = inject(GameDialogService);
  vcr = inject(ViewContainerRef);

  constructor() {
    this.controls = this.dialogService.loadConfig(this.vcr);
    this.loadDialog(0);
  }

  loadDialog(index: number) {
    const positions: SpeechBubblePositionMapping = {
      'first-dude': { x: 100, y: 300 },
      'second-dude': { x: 300, y: 400 },
    };

    this.dialogService.startDialog(dialogs[index], positions);
  }
}
