import { Directive, Input, Output, Renderer, EventEmitter, ElementRef } from '@angular/core';
import { ConfigService } from '../config.service';

@Directive({
    selector: '[tbnSort]'
})
export class TbnSortDirective {
    @Input() predicate: string;
    @Input() ascending: boolean;
    @Input() callback: Function;

    sortIcon = 'fa-sort';
    sortAscIcon = 'fa-sort-asc';
    sortDescIcon = 'fa-sort-desc';
    sortIconSelector = 'span.fa';

    @Output() predicateChange: EventEmitter<any> = new EventEmitter();
    @Output() ascendingChange: EventEmitter<any> = new EventEmitter();

    element: any;

    constructor(el: ElementRef, renderer: Renderer, configService: ConfigService) {
        this.element = el.nativeElement;
        const config = configService.getConfig();
        this.sortIcon = config.sortIcon;
        this.sortAscIcon = config.sortAscIcon;
        this.sortDescIcon = config.sortDescIcon;
        this.sortIconSelector = config.sortIconSelector;
    }

    sort (field: any) {
        this.resetClasses();
        if (field !== this.predicate) {
            this.ascending = true;
        } else {
            this.ascending = !this.ascending;
        }
        this.predicate = field;
        this.predicateChange.emit(field);
        this.ascendingChange.emit(this.ascending);
        this.callback();
    }

    private resetClasses() {
        const allThIcons = this.element.querySelectorAll(this.sortIconSelector);
        allThIcons.forEach((value) => {
            value.classList.remove(this.sortAscIcon);
            value.classList.remove(this.sortDescIcon);
            value.classList.add(this.sortIcon);
        });
    };
}
