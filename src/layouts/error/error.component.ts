import { Component, OnInit } from '@angular/core';
import { TbnLanguageService } from '../../libs/libs.module';

@Component({
    selector: 'tbn-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;

    constructor(
        private  LanguageService: TbnLanguageService
    ) {
        this.LanguageService.setLocations(['error']);
    }

    ngOnInit() {
    }
}
