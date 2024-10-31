import { Component } from '@angular/core';

@Component({
  selector: 'lib-dialog-lib',
  standalone: true,
  imports: [],
  template: ` <p>dialog-lib works!</p> `,
  styles: ``,
})
export class DialogLibComponent {
  public callMe() {
    console.log('i was called!');
  }
}
