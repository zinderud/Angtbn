import { NgModule, Sanitizer } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
 import {   AlertService } from '../libs/libs.module';
import {
    BsnSharedLibsModule,
    TbnLanguageHelper,
    FindLanguageFromKeyPipe,
    TbnAlertComponent,
    TbnAlertErrorComponent
} from './';

export function alertServiceProvider(sanitizer: Sanitizer, translateService: TranslateService) {
    // set below to true to make alerts look like toast
    const isToast = false;
    return new AlertService(sanitizer, isToast, translateService);
}

@NgModule({
    imports: [
        BsnSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        TbnAlertComponent,
        TbnAlertErrorComponent
    ],
    providers: [
        TbnLanguageHelper,
        {
            provide: AlertService,
            useFactory: alertServiceProvider,
            deps: [Sanitizer, TranslateService]
        },
        Title
    ],
    exports: [
        BsnSharedLibsModule,
        FindLanguageFromKeyPipe,
        TbnAlertComponent,
        TbnAlertErrorComponent
    ]
})
export class BsnSharedCommonModule {}
