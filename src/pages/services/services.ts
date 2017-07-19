import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServicesArticlePage} from "../service-article/service-article";
import {ServicesService} from "../../app/services/services.service";
import {SafeSubscribe} from "../../app/helpers/safe-subscripe/safe-subscripe";

@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage extends SafeSubscribe {
  services: any;

  constructor(
    public navCtrl: NavController,
    private servicesService: ServicesService
  ) {
    super();
    this.servicesService.servicesAsync.safeSubscribe(this, (value) => {
      this.services = value;
    });
  }

  goToOtherPage(item) {
    this.navCtrl.push(ServicesArticlePage, {params: item});
  }
}
