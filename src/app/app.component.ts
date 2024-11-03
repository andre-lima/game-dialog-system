import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDialogComponent } from '../../projects/game-dialog-lib/src/public-api';
import { dialogs } from './dialogs/dialogs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GameDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private viewContainer: ViewContainerRef) {}

  loadDialog(index: number) {
    const dialogComponent: ComponentRef<GameDialogComponent> =
      this.viewContainer.createComponent(GameDialogComponent);
    dialogComponent.instance.openDialog(dialogs[index], dialogComponent);
  }
}
