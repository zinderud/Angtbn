import { Directive, Host, HostListener, Input, ElementRef, Renderer } from '@angular/core';
import { TbnSortDirective } from './sort.directive';
import { ConfigService } from '../config.service';

@Directive({
    selector: '[tbnSortBy]'
})
export class TbnSortByDirective {
    @Input() tbnSortBy: string;

    sortAscIcon = 'fa-sort-asc';
    sortDescIcon = 'fa-sort-desc';

    tbnSort: TbnSortDirective;

    constructor(@Host() tbnSort: TbnSortDirective, private el: ElementRef, private renderer: Renderer, configService: ConfigService) {
        this.tbnSort = tbnSort;
        const config = configService.getConfig();
        this.sortAscIcon = config.sortAscIcon;
        this.sortDescIcon = config.sortDescIcon;
    }

    @HostListener('click') onClick() {
        if (this.tbnSort.predicate && this.tbnSort.predicate !== '_score') {
            this.tbnSort.sort(this.tbnSortBy);
            this.applyClass();
        }
    }

    private applyClass () {
        const childSpan = this.el.nativeElement.children[1];
        let add = this.sortAscIcon;
        if (!this.tbnSort.ascending) {
            add = this.sortDescIcon;
        }
        this.renderer.setElementClass(childSpan, add, true);
    };
}
