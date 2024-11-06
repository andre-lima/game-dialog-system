import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDialogComponent } from '../../projects/game-dialog-lib/src/public-api';
import { dialogs } from './dialogs/dialogs';
import { GameDialogService } from '../../projects/game-dialog-lib/src/lib/dialog/dialog.service';
import { SpeechBubblePositionMapping } from '../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GameDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  dialogService = inject(GameDialogService);
  vcr = inject(ViewContainerRef);

  constructor() {
    // this.loadDialog(0);
    this.dialogService.loadConfig(this.vcr);
  }

  loadDialog(index: number) {
    const positions: SpeechBubblePositionMapping = {
      'first-dude': { x: 100, y: 300 },
      'second-dude': { x: 300, y: 400 },
    };
    this.dialogService.startDialog(dialogs[index], positions);
    // const dialogComponent: ComponentRef<GameDialogComponent> =
    //   this.viewContainer.createComponent(GameDialogComponent);
    // dialogComponent.instance.openDialog(dialogs[index], dialogComponent);
  }
}
