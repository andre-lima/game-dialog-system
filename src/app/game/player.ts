import { Component, Inject } from '@angular/core';
import { Actor, ActorArgs, Color } from 'excalibur';

export class Player extends Actor {
  constructor(config: ActorArgs) {
    super(config);
  }
}
