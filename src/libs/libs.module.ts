
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';
 import { TranslateModule, MissingTranslationHandler, TranslateLoader } from 'ng2-translate';
  import { TranslateService } from 'ng2-translate';

import { CRM_PIPES, CRM_DIRECTIVES, CRM_COMPONENTS, CRM_SERVICES } from './tbn-components';
 import {
    TbnMissingTranslationHandler,
    TranslatePartialLoader,
    TbnTranslateComponent,
    TbnLanguageService
} from './language';

import { ModuleConfig } from './config';
import { ConfigService } from './config.service';

// Re export the files
export * from './pipe';
export * from './directive';
export * from './service';
export * from './component';
export * from './language';
export * from './interceptor';
export function translatePartialLoader(http: Http) {
    return new TranslatePartialLoader(http, 'i18n', '.json');
}

export function missingTranslationHandler(configService: ConfigService) {
    return new TbnMissingTranslationHandler(configService);
}


@NgModule({
    imports: [
      TranslateModule.forRoot({

            provide: TranslateLoader,
            useFactory: translatePartialLoader,
            deps: [Http]
        }),

        HttpModule,
        CommonModule
    ],
    declarations: [
        ...CRM_PIPES,
        ...CRM_DIRECTIVES,
        ...CRM_COMPONENTS ,
        TbnTranslateComponent
    ],
        providers: [
        {
            provide: MissingTranslationHandler, useFactory: missingTranslationHandler, deps: [ConfigService]
        }
    ],

    exports: [
        ...CRM_PIPES,
        ...CRM_DIRECTIVES,
        ...CRM_COMPONENTS ,
          TbnTranslateComponent,
            TranslateModule,
        HttpModule,
        CommonModule
    ]
})
export class NgBtnLibsModule {
    static forRoot(moduleConfig: ModuleConfig): ModuleWithProviders {
        return {
            ngModule: NgBtnLibsModule,
            providers: [
                ...CRM_SERVICES,
                TbnLanguageService,
                { provide: ModuleConfig, useValue: moduleConfig },
                ConfigService
            ]
        };
    }
}
