import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(injector: Injector) {
    const PopupElement = createCustomElement(DialogComponent, { injector });
    customElements.define('dialog-element', PopupElement);
  }
}
