import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-service-article',
  templateUrl: 'service-article.html'
})
export class ServicesArticlePage{
  service: any;

  constructor(private navParams: NavParams) {
    this.service = this.navParams.get('params');
  }


  // ionViewDidLeave() {
  //   console.log(1);
  //   this.navCtrl.pop();
  // }
}
