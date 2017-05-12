import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileInfo } from './profile-info.model';

@Component({
    selector: 'tbn-page-ribbon',
    template: `<div class="ribbon" *ngIf="ribbonEnv"><a href="" tbnTranslate="global.ribbon.{{ribbonEnv}}">{{ribbonEnv}}</a></div>`,
    styleUrls: [
        'page-ribbon.scss'
    ]
})
export class PageRibbonComponent implements OnInit {

    profileInfo: ProfileInfo;
    ribbonEnv: string;

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        const sbt = this.profileService.getProfileInfo();
        this.profileInfo = sbt;
        this.ribbonEnv = sbt.ribbonEnv;
     }
}
