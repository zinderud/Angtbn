import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class AuthServerProvider {
    isLoginPublisher = new BehaviorSubject<boolean>(this.getLocalData('tbn-authenticationtoken'));
    userPublisher = new BehaviorSubject<boolean>(this.getLocalData('tbn-user'));
    isadmin = false;
    constructor(
        private http: Http,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService

    ) { }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials): Observable<any> {

        const data = {
            email: credentials.email,
            password: credentials.password,
            rememberMe: credentials.rememberMe
        };
        const url = `http://localhost:8000/api/user/login`;
        const pdata = 'email=' + encodeURIComponent(credentials.email) +
            '&password=' + encodeURIComponent(credentials.password);
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(url, pdata, { headers }).map(authenticateSuccess.bind(this));

        function authenticateSuccess(resp) {
            const json = resp.json();


            this.storeAuthenticationToken(json, credentials.rememberMe);

            this.isLoginPublisher.next(true);
            this.userPublisher.next(json.foundUser);
            if (json.foundUser.roleId === 1) {
                this.isadmin = true;
            }
            return json;

        }
    }
    isLoggedIn(): Observable<boolean> {
        return this.isLoginPublisher.asObservable();
    }

    isLoggedInCurrent(): boolean {
        return this.isLoginPublisher.getValue();
    }

    getUser(): Observable<any> {
        return this.userPublisher.asObservable();
    }
    isAdmin() {
        return this.isadmin;
    }

    loginWithToken(json, rememberMe) {
        if (json) {
            this.storeAuthenticationToken(json.token, rememberMe);
            return Promise.resolve(json);
        } else {
            return Promise.reject('auth-service Promise reject'); // Put appropriate error message here
        }
    }

    storeAuthenticationToken(json, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', json.token);
            this.$localStorage.store('user', json.foundUser);

        } else {
            this.$sessionStorage.store('authenticationToken', json.token);
            this.$sessionStorage.store('user', json.foundUser);
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.isLoginPublisher.next(false);
            this.userPublisher.next(null);
            this.$localStorage.clear('user');
            this.$sessionStorage.clear('user');
            this.$localStorage.clear('authenticationToken');
            this.$sessionStorage.clear('authenticationToken');
            observer.complete();
        });
    }

      getUserLocalData(name) {
        if (name === 'authenticationToken') {
            return !!localStorage.getItem('tbn-authenticationToken');
        }
        const user = localStorage.getItem('tbn-user');
        if (user) {
            return JSON.parse(user);
        }
        return null;

    }

    private getLocalData(name): boolean {

        if (!!localStorage.getItem(name)) {
            return true;
        }
        if (!!sessionStorage.getItem(name)) {
            return true;
        }


        return false;
    }

    getImageUrl() {
        return null;
    }
}
