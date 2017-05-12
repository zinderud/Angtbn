import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import {
    BsnSharedLibsModule,
    BsnSharedCommonModule,
    CSRFService,

    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,

    TbnLoginModalComponent
} from './';

@NgModule({
    imports: [
        BsnSharedLibsModule,
        BsnSharedCommonModule
    ],
    declarations: [
        TbnLoginModalComponent,

    ],
    providers: [
        CookieService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,

        CSRFService,
        AuthServerProvider,

        UserService,
        DatePipe
    ],
    entryComponents: [TbnLoginModalComponent],
    exports: [

        BsnSharedCommonModule,
        TbnLoginModalComponent,

        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BsnSharedModule {}
