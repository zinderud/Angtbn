import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

 import {NgBtnLibsModule} from '../libs/libs.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        NgBtnLibsModule.forRoot({
            i18nEnabled: true,
            defaultI18nLang: 'tr'
        }),
        InfiniteScrollModule
    ],
    exports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgbModule,
        NgBtnLibsModule,
        InfiniteScrollModule
    ]
})
export class BsnSharedLibsModule {}
