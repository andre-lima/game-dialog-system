import { Component, Inject } from '@angular/core';
import { Actor, ActorArgs, Color } from 'excalibur';

@Component({ template: '' })
export class Player extends Actor {
  constructor(@Inject({}) config: ActorArgs) {
    super(config);
  }
}
