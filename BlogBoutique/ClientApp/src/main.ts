import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export function getApiUrl() {
  return "https://81in27jci3.execute-api.us-east-1.amazonaws.com/Prod/";
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'API_URL', useFactory: getApiUrl, deps: [] }

];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
