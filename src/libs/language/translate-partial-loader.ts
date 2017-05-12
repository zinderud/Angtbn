/*
 * Copyright 2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from 'ng2-translate';

export class TranslatePartialLoader implements TranslateLoader {
    private locations: string[] = [];

    constructor(private http: Http, private prefix = 'i18n', private suffix = '.json') {
    }

    public setLocations(locations: string[]) {
        this.locations = locations;
    }

    public getTranslation(lang: string): Observable<any> {
        const combinedObject = new Object();
        let oldObsevers: Observable<any>;
        let newObserver: Observable<any>;
        this.locations.forEach((value) => {
            newObserver = this.getPartFile(value, combinedObject, lang);
            if (oldObsevers == null) {
                oldObsevers = newObserver;
            } else {
                oldObsevers = oldObsevers.merge(newObserver);
            }
        });
        return oldObsevers;
    }

    private getPartFile(part: string, combinedObject: any, lang: string): Observable<any> {
        return Observable.create((observer: any) => {
            this.http.get(`${this.prefix}/${lang}/${part}${this.suffix}`).subscribe((res) => {
                const responseObj = res.json();
                Object.keys(responseObj).forEach(key => {
                    if (!combinedObject[key]) {
                        combinedObject[key] = responseObj[key];
                    } else {
                        Object.assign(combinedObject[key], responseObj[key]);
                    }
                });
                observer.next(combinedObject);
                // Call complete to close this stream (like a promise)
                observer.complete();
            });
        });
    }
}
