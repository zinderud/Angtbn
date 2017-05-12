import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsnAppModule } from './app.module';
import { ProdConfig } from './blocks/config/prod.config';
// import { environment } from './environments/environment';
/*
if (environment.production) {
  enableProdMode();
}*/
ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(BsnAppModule);
