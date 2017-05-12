
import {
    CapitalizePipe,
    FilterPipe,
    KeysPipe,
    OrderByPipe,
    PureFilterPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe
} from './pipe';
import {
    MaxbytesValidatorDirective,
    MinbytesValidatorDirective,
    TbnSortDirective,
    TbnSortByDirective
} from './directive';
import { TbnItemCountComponent } from './component';
import {
    DataUtils,
    DateUtils,
    EventManager,
    AlertService,
    ParseLinks,
    PaginationUtil,
    Base64

} from './service';

export const CRM_PIPES = [
    CapitalizePipe,
    FilterPipe,
    KeysPipe,
    OrderByPipe,
    PureFilterPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe
];

export const CRM_DIRECTIVES = [
    MaxbytesValidatorDirective,
    MinbytesValidatorDirective,
    TbnSortDirective,
    TbnSortByDirective
];

export const CRM_COMPONENTS = [
    TbnItemCountComponent
];

export const CRM_SERVICES = [
    DataUtils,
    DateUtils,
    EventManager,
    ParseLinks,
    PaginationUtil,
    Base64
];
