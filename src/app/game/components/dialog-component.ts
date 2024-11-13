import { Actor, CircleCollider, Component, Vector } from 'excalibur';
import { DialogSystem } from './dialog-system';

export class DialogManagerComponent extends Component {
  // player position
  // list of dialogs
  // spritesheets for the animatons
  // name mapping
  // how to trigger dialog actions affection player
  // state/store/event system

  constructor() {
    super();
  }

  override onAdd(owner: Actor): void {
    const trigger = new Actor({
      width: 100,
      height: 100,
      pos: Vector.Zero,
      collider: new CircleCollider({
        radius: 1.2 * owner.width,
      }),
    });

    trigger.on('collisionstart', (collision) => {
      if (!collision.other.hasTag('player')) return;

      DialogSystem.activePromptEntities.set(owner.name, owner);
    });

    trigger.on('collisionend', () => {
      DialogSystem.activePromptEntities.delete(owner.name);
    });

    owner.addChild(trigger);
  }
}
