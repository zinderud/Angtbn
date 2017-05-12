import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TbnLanguageService } from '../../libs/libs.module';
import { ProfileService } from '../profiles/profile.service';
import { TbnLanguageHelper, AuthServerProvider, LoginModalService, LoginService } from '../../shared';
import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
@Component({
    selector: 'tbn-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    isLoggedIn: Observable<boolean>;

    constructor(
        private loginService: LoginService,
        private languageHelper: TbnLanguageHelper,
        private languageService: TbnLanguageService,
        private auth: AuthServerProvider,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = DEBUG_INFO_ENABLED ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
        this.isLoggedIn = this.auth.isLoggedIn();
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        const profileInfo = this.profileService.getProfileInfo();
        this.inProduction = profileInfo.inProduction;
        this.swaggerEnabled = profileInfo.swaggerEnabled;

    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.auth.isLoggedIn;
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.auth.getImageUrl() : null;
    }
}
