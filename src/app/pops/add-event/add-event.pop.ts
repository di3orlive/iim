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
    
    
    constructor(public viewCtrl: ViewController,
                private servicesService: ServicesService) {
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
            status: 'confirmed',
            colorId: 1,
            summary: this.selectedService.summary,
            description: `name: ${this.add.name}
${this.add.phone ? 'phone:' +this.add.phone : ''}
${this.add.email ? 'email:' +this.add.email : ''}
${this.add.additional ? 'additional:' +this.add.additional : ''}`,
            start: {dateTime: new Date(this.dateStart).toISOString()},
            end: {dateTime: new Date(this.dateEnd).toISOString()}
        };
        // 'location': 'Coffeeshop',
        // 'status': 'confirmed',
        
        
        
        
        console.log(body);
        
        this.viewCtrl.dismiss(body);
    }
    
    close() {
        this.viewCtrl.dismiss();
    }
    
    
    onSelectService() {
        this.dateEnd = new Date(new Date(this.dateStart).getTime() + (this.selectedService.time * 60000));
        console.log(this.dateEnd);
    }
}
