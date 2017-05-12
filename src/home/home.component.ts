import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, TbnLanguageService } from '../libs/libs.module';

import { Account, LoginModalService, AuthServerProvider } from '../shared';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
@Component({
    selector: 'tbn-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    modalRef: NgbModalRef;
    isLoggedIn: Observable<boolean>;
    constructor(
        private LanguageService: TbnLanguageService,
        private auth: AuthServerProvider,
        private loginModalService: LoginModalService,
        private eventManager: EventManager
    ) {
        this.LanguageService.setLocations(['home']);
    }
    ngOnInit() {
        this.isLoggedIn = this.auth.isLoggedIn();
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }
}
