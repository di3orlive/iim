import {Component, OnInit} from '@angular/core';
import {ViewController} from "ionic-angular";
import {SafeSubscribe} from "../../helpers/safe-subscripe/safe-subscripe";
import {ServicesService} from "../../services/services.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './add-event.pop.html'
})
export class AddEventPop extends SafeSubscribe implements OnInit {
  add = {
    name: '',
    phone: '',
    email: '',
    additional: ''
  };
  dateStart: Date;
  dateEnd: Date;
  selectedService = {
    summary: '',
    img: '',
    time: 0,
  };
  services: any;


  constructor(
    public viewCtrl: ViewController,
    private servicesService: ServicesService
  ) {
    super();
    this.servicesService.servicesAsync.safeSubscribe(this, (value) => {
      this.services = value;
    });


    console.log(this.viewCtrl.data.data);
    this.dateStart = this.viewCtrl.data.data;
  }


  ngOnInit() {
  }


  save(f) {
    if (f.invalid) {
      return;
    }

    const body = {
      start: this.dateStart,
      end: this.dateEnd,
      summary: this.selectedService.summary,
      description: `name: ${this.add.name}
      phone: ${this.add.phone}
      email: ${this.add.email}
      additional: ${this.add.additional}
      `
    };

    console.log(body);

    this.viewCtrl.dismiss(body);
  }

  close() {
    this.viewCtrl.dismiss();
  }


  onSelectService() {
    this.dateEnd = new Date(new Date(this.dateStart).getTime() + (this.selectedService.time * 60000));
  }
}
