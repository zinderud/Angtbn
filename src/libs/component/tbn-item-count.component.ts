
import { Component, Input } from '@angular/core';

/**
 * A component that will take care of item count statistics of a pagination.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tbn-item-count',
    template: `
        <div class="info item-count">
            Showing {{((page - 1) * itemsPerPage) == 0 ? 1 : ((page - 1) * itemsPerPage + 1)}} -
            {{(page * itemsPerPage) < total ? (page * itemsPerPage) : total}}
            of {{total}} items.
        </div>`
})
export class TbnItemCountComponent {

   /**
    *  current page number.
    */
    @Input() page: number;

   /**
    *  Total number of items.
    */
    @Input() total: number;

   /**
    *  Number of items per page.
    */
    @Input() itemsPerPage: number;

    constructor() {}
}
