// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { DialogComponent } from './app/dialog/dialog.component';

(async () => {
  const app = await createApplication({
    providers: [
      /* your global providers here */
    ],
  });

  const dialogElement = createCustomElement(DialogComponent, {
    injector: app.injector,
  });

  customElements.define('my-dialog', dialogElement);
})();
