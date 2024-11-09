import {
  Actor,
  CircleCollider,
  Component,
  Entity,
  Trigger,
  vec,
  Vector,
} from 'excalibur';
import { GameDialogService } from '../../../../projects/game-dialog-lib/src/public-api';
import { dialogs } from '../../dialogs/dialogs';

export class DialogManagerComponent extends Component {
  // player position
  // list of dialogs
  // spritesheets for the animatons
  // name mapping

  // trigger area
  // prompt to show: "(A) to talk"

  dialogService: GameDialogService;

  constructor(dialogService: GameDialogService) {
    super();

    this.dialogService = dialogService;
  }

  override onAdd(owner: Actor): void {
    const trigger = new Actor({
      width: 100,
      height: 100,
      pos: Vector.Zero,
      collider: new CircleCollider({
        radius: 1.2 * owner.width, // 10 pixel radius
      }),
    });

    trigger.on('collisionstart', (collision) => {
      if (collision.other === owner) return;

      collision.other.vel.x = 0;

      this.dialogService.startDialog(dialogs[1], {
        [collision.other.name]: collision.other.pos.add(vec(0, -70)),
        [owner.name]: owner.pos.add(vec(0, -70)),
      });
    });

    owner.addChild(trigger);
  }
}
