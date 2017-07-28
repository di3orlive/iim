import {Component, AfterViewInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {SafeSubscribe} from "../../app/helpers/safe-subscripe/safe-subscripe";
import {CommonService} from "../../app/services/common";

declare const google;

@Component({
    selector: 'page-contacts-article',
    templateUrl: 'contacts-article.html'
})
export class ContactsArticlePage extends SafeSubscribe implements AfterViewInit {
    mapOptions: any;
    map: any;
    contact: any;
    isOnline: any;
    
    constructor(public commonService: CommonService, private navParams: NavParams) {
        super();
        this.commonService.mapOptions.safeSubscribe(this, (value) => {
            this.mapOptions = value;
        });
        this.commonService.isOnlineAsync.safeSubscribe(this, (value) => {
            this.isOnline = value;
        });
        this.contact = this.navParams.get('params');
    }
    
    
    ngAfterViewInit() {
        this.initMap();
    }
    
    
    initMap() {
        this.mapOptions.center = this.contact.address_position;
    
        this.map = new google.maps.Map(document.querySelector('#map'), this.mapOptions);
        
        new google.maps.Marker({
            position: this.contact.address_position,
            map: this.map,
            title: 'YO'
        });
    }
}
