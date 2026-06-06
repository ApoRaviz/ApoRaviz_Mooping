import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // ใช้ path URL ปกติ เพราะ MVP ตอนนี้มีหน้าเดียวและ GitHub Pages จัด path ผ่าน base-href ของ build
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
