
import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { numberOfBytes } from './number-of-bytes';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[tbnMaxbytes][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MaxbytesValidatorDirective), multi: true }
    ]
})
export class MaxbytesValidatorDirective {
    @Input() CrmMaxbytes: number;

    constructor() {}

    validate(c: FormControl) {
        return (c.value && numberOfBytes(c.value) <= this.CrmMaxbytes) ? null : {
            maxbytes: {
                valid: false
            }
        };
    }
}
