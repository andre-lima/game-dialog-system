import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { Engine, Color, Actor } from 'excalibur';
import { dialogs } from './dialogs/dialogs';
import { GameDialogService } from '../../projects/game-dialog-lib/src/lib/dialog/dialog.service';
import { SpeechBubblePositionMapping } from '../../projects/game-dialog-lib/src/lib/dialog/store/dialog.model';
import { DialogControls } from '../../dist/game-dialog-lib';
import { DialogConfig } from '../../dist/game-dialog-lib/lib/dialog/dialog.config';
import { DialogManagerComponent } from './game/components/dialog-component';
import { BehaviorSubject } from 'rxjs';
import { Player } from './game/player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
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
  game: Engine;

  constructor() {
    const configOverride: Partial<DialogConfig> = {
      speakerNames: {
        'mean-thief': 'Mean Thief',
        victim: 'Poor Victim',
      },
    };
    this.controls = this.dialogService.loadConfig(this.vcr, configOverride);
    // this.loadDialog(0);
  }

  ngAfterViewInit(): void {
    this.game = new Engine({
      width: 800,
      height: 600,
      backgroundColor: Color.ExcaliburBlue,
      canvasElementId: 'game',
    });

    const actor1 = new Player({
      x: 40,
      y: 100,
      color: Color.Vermilion,
      name: 'mean-thief',
      width: 50,
      height: 50,
    });

    const actor2 = new Actor({
      x: 300,
      y: 120,
      color: Color.Green,
      name: 'victim',
      width: 50,
      height: 50,
    });

    this.game.add(actor1);
    this.game.add(actor2);

    actor1.vel.x = 100;

    // Create a component that will get the dialog based on the name of the npc/object
    // Then, when the dialog is triggered (press A for example), it will get the npc and player
    // positions and send to the dialog system
    // Trigger custom events on start and end of dialogs

    actor2.addComponent(new DialogManagerComponent(this.dialogService));

    this.game.toggleDebug();

    this.game.start();
  }

  // For testing with the buttons
  loadDialog(index: number) {
    const positions: SpeechBubblePositionMapping = {
      'first-dude': { x: 100, y: 300 },
      'second-dude': { x: 300, y: 400 },
    };

    this.dialogService.startDialog(dialogs[index], positions);
  }
}
