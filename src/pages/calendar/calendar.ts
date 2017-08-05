import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import {Subject} from 'rxjs';
import {CalendarService} from '../../app/services/calendar.service';
import {AddEventPop} from '../../app/pops/add-event/add-event.pop';
import {CommonService} from '../../app/services/common';
import {SafeSubscribe} from '../../app/helpers/safe-subscripe/safe-subscripe';

@Component({
    selector: 'page-home',
    templateUrl: 'calendar.html'
})
export class CalendarPage extends SafeSubscribe {
    viewDate: Date = new Date();
    colors: any = {
        past: {
            primary: '#fd8181',
            secondary: '#fd8181'
        },
        future: {
            primary: '#c7ffd1',
            secondary: '#c7ffd1'
        },
        present: {
            primary: 'rgb(161, 197, 250)',
            secondary: 'rgb(161, 197, 250)'
        }
    };
    events = [];
    refresh: Subject<any> = new Subject();
    masseur = 'inna';
    isOnline: any;
    curDayId: any;
    hrInterval: any;
    week = [];
    
    
    constructor(
        private calendarService: CalendarService,
        private datePipe: DatePipe,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public commonService: CommonService
    ) {
        super();
        this.commonService.isOnlineAsync.safeSubscribe(this, (value) => {
            this.isOnline = value;
        });
        this.dateInit();
    }
    
    
    dateInit(){
        for(let i = 0; i < 7; i++){
            const dateMin = new Date(new Date().setDate(new Date().getDate() + (i)));
            const dateMax = new Date(new Date().setDate(new Date().getDate() + (i + 1)));
            let timeMin = this.datePipe.transform(dateMin, 'yyyy-MM-dd');
            let timeMax = this.datePipe.transform(dateMax, 'yyyy-MM-dd');
            timeMin += 'T00:00:00Z';
            timeMax += 'T00:00:00Z';
            const params = {
                timeMin: timeMin,
                timeMax: timeMax
            };
            
            this.week.push({
                id: i,
                date: new Date(new Date().setDate(new Date().getDate() + (i))),
                params: params,
                isActive: false
            })
        }
        
        this.setDay(0);
    }
    
    
    getCalendarEvents(params, masseur) {
        this.calendarService.getDayEvents(params, masseur).safeSubscribe(this, (res: any) => {
            this.events = [];
            
            res.forEach((item) => {
                let now = +new Date();
                let start = new Date(item.start.dateTime);
                let end = new Date(item.end.dateTime);
                let color: any;
                
                if (now >= +start && now <= +end) {
                    color = this.colors.present;
                } if (now >= +end) {
                    color = this.colors.past;
                } if (now <= +start) {
                    color = this.colors.future;
                }
                
                this.events.push({
                    start: start,
                    end: end,
                    title: item.summary,
                    color: color
                });
            });
        });
    }
    
    
    setDay(id) {
        clearInterval(this.hrInterval);
        
        this.viewDate = this.week[id].date;
        this.curDayId = id;

        this.week.forEach((it) => {
            it.isActive = false;
        });

        this.week[id].isActive = true;

        this.getCalendarEvents(this.week[id].params, this.masseur);
    }
    
    
    addEvent(date, e) {
        console.log(e);
        
        let now = +new Date();
        let end = new Date(date);
        if (now >= +end) {
            let toast = this.toastCtrl.create({
                message: 'You can\'t add event here',
                duration: 2000,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        }



        let profileModal = this.modalCtrl.create(AddEventPop, {data: date});
        profileModal.onDidDismiss((res: any) => {
            if (!!res) {
                let loader = this.loadingCtrl.create({
                    spinner: 'hide',
                    content: '<img src="./assets/icon/massage.gif">',
                });
                loader.present();


                this.calendarService.insertEvent(res, this.masseur).safeSubscribe(this, (res) => {
                    this.getCalendarEvents(this.week[this.curDayId].params, this.masseur);
                    loader.dismiss();
                });
            }
        });
        profileModal.present();
    }
    
    
    doRefresh(refresher) {
        this.getCalendarEvents(this.week[this.curDayId].params, this.masseur);
        refresher.complete();
    }
    
    
    swipeEvent(e){
        if (e.direction == 2) {
            console.log('right');
            this.masseur = 'ira';
        }
        if (e.direction == 4) {
            console.log('left');
            this.masseur = 'inna';
        }
        
        this.setDay(this.curDayId);
    }
    
    beforeHrRender(e): void {
        this.hrInterval = setInterval(() => {
            console.log(1);
            e.body.forEach(hr => {
                hr.segments.forEach((segment) => {
                    if (+new Date() >= +new Date(segment.date)) {
                        segment.cssClass = 'inactive-hr';
                    }
                })
            });
        },10000);
    }
}


