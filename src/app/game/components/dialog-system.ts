import {
  Actor,
  Engine,
  Entity,
  KeyEvent,
  Scene,
  System,
  SystemType,
  World,
} from 'excalibur';

export class DialogSystem extends System {
  static activePromptEntities: Map<string, Actor> = new Map();

  override systemType: SystemType = SystemType.Update;
  engine: Engine;
  focusedEntity: Actor;

  previousEntityMapSize = 0;

  constructor(world: World) {
    super();
  }

  override initialize(world: World, scene: Scene): void {
    this.engine = scene.engine;

    this.engine.input.keyboard.on('release', (evt: KeyEvent) => {
      if (evt.key === 'Space') {
        console.log(this.focusedEntity?.name || '-');
      }
    });
  }

  update() {
    // Avoids closing and reopening the dialog prompt unless there was a
    // change in the components that the player is overlapping.
    const updateFocusedEntity =
      this.previousEntityMapSize !== DialogSystem.activePromptEntities.size;
    this.previousEntityMapSize = DialogSystem.activePromptEntities.size;

    if (updateFocusedEntity) {
      this.focusedEntity = [...DialogSystem.activePromptEntities]?.[0]?.[1];

      if (this.engine.dialogService.isDialogPromptActive()) {
        this.engine.dialogService.closeDialogPrompt();
      }

      if (
        DialogSystem.activePromptEntities.size > 0 &&
        !this.engine.dialogService.isDialogPromptActive()
      ) {
        this.engine.dialogService.openDialogPrompt(this.focusedEntity.pos);
      }
    }
  }
}
