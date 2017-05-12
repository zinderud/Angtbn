import { Injectable } from '@angular/core';
import { TbnLanguageService } from '../../libs/libs.module';

import { AuthServerProvider } from '../auth/auth-jwt.service';
@Injectable()
export class LoginService {

    constructor(
        private languageService: TbnLanguageService,

        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {

                    if (data.foundUser !== null) {
                        this.languageService.changeLanguage(data.foundUser.langKey);
                    }
                    resolve(data);

                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    logout() {
        this.authServerProvider.logout().subscribe();

    }
}
