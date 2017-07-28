import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
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
    curDayId: any;
    events = [];
    masseur = 'inna';
    hrs = [];
    week = [];
    isOnline: any;
    
    
    constructor(private calendarService: CalendarService,
                private datePipe: DatePipe,
                private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public commonService: CommonService) {
        super();
        this.commonService.isOnlineAsync.safeSubscribe(this, (value) => {
            this.isOnline = value;
        });
        this.dateInit();
        this.hrsInit();
    
        setInterval(() => {
            this.timeLine();
        }, 60000);
    }
    
    
    dateInit() {
        for (let i = 0; i < 7; i++) {
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
    
    
    hrsInit() {
        this.hrs = [];
        
        const today = this.week[this.curDayId].date;
        today.setHours(8, 0, 0, 0);
        
        // start: new Date(today.setMinutes(today.getMinutes() + 30)),
        
        for (let i = 0; i < 12; i++) {
            let start = new Date(today.setHours(8 + i, 0, 0, 0));
            
            this.hrs.push({
                start: start,
                events: [],
                inactive: false,
                time_line: ''
            });
        }
        
        this.timeLine();
    }
    
    
    getCalendarEvents(body, masseur) {
        // const dateMin = new Date(Date.now());
        // const dateMax = new Date(new Date().setDate(new Date().getDate() + 1));
        //
        // let timeMin = this.datePipe.transform(dateMin, 'yyyy-MM-dd');
        // let timeMax = this.datePipe.transform(dateMax, 'yyyy-MM-dd');
        // timeMin += 'T00:00:00Z';
        // timeMax += 'T00:00:00Z';
        // const params = {
        //   timeMin: timeMin,
        //   timeMax: timeMax
        // };
        
        this.calendarService.getDayEvents(body, masseur).then((res: any) => {
            this.events = [];
            
            res.items.forEach((item) => {
                let now = +new Date();
                let start = new Date(item.start.dateTime);
                let end = new Date(item.end.dateTime);
                let color = '';
                
                if (now >= +start && now <= +end) {
                    color = '#A1C5FA';
                }
                if (now >= +end) {
                    color = '#fd8181';
                }
                if (now <= +start) {
                    color = '#c7ffd1';
                }
                
                this.events.push({
                    summary: item.summary,
                    color: color,
                    start: start,
                    end: end,
                    height: (+end - +start) / 1000 / 60,
                    offsetTop: this.datePipe.transform(start, 'mm')
                });
            });
            
            this.sortEvents();
        });
    }
    
    
    sortEvents() {
        this.hrsInit();
        
        // let eventsClone = this.events.map(a => Object.assign({}, a));
        
        for (let i = 0; i < this.hrs.length; i++) {
            let curTimeEnd = this.addHours(new Date(this.hrs[i].start), 1);
    
    
            // debugger;
            // console.log(this.hrs[i].start);
    
            if (this.hrs[i] && this.hrs[i].start) {
                let now = +new Date();
                let hrEnd = +new Date(this.hrs[i].start);
        
                this.hrs[i].inactive = now >= hrEnd;
            }
            
            this.events.forEach((item2, i2, arr2) => {
                let eventStart = +this.datePipe.transform(item2.start, 'HHmm');
                let curTimeEndHr = +this.datePipe.transform(curTimeEnd, 'HHmm');
                
                if (eventStart < curTimeEndHr && arr2.length > 0) {
                    this.hrs[i].events.push(arr2.splice(0, 1)[0]);
                    
                    i--;
                }
            });
        }
        
        
        // this.hrs.forEach((item) => {
        //     item.inactive = item.events[0] != null && +new Date() >= +new Date(item.start)
        // });
        
        
        // this.hrs.forEach((item, i, arr) => {
        //     // let curTime = new Date(item.start);
        //     let curTimeEnd = this.addHours(new Date(item.start), 1);
        //
        //     // item.inactive = +new Date(item.start) <= +new Date();
        //
        //
        //     this.events.forEach((item2, i2, arr2) => {
        //         let eventStart = +this.datePipe.transform(item2.start, 'HHmm');
        //         let curTimeEndHr = +this.datePipe.transform(curTimeEnd, 'HHmm');
        //
        //         debugger;
        //         if (eventStart < curTimeEndHr && this.events.length > 0) {
        //             item.events.push(arr2.splice(0, 1)[0]);
        //         }
        //     });
        // });
    }
    
    
    setDay(id) {
        this.viewDate = this.week[id].date;
        this.curDayId = id;
        
        this.week.forEach((it) => {
            it.isActive = false;
        });
        
        this.week[id].isActive = true;
        
        this.getCalendarEvents(this.week[id].params, this.masseur);
    }
    
    
    addEvent(item) {
        let now = +new Date();
        let end = new Date(item.start);
        if (now >= +end || item.events[0] != null) {
            let toast = this.toastCtrl.create({
                message: 'You can\'t add event here',
                duration: 2000,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        }
        
        
        // const body = {
        //   summary: 'JS CLIENT',
        //   description: 'KOKOKO',
        //   start: {dateTime: new Date('2017-07-21T10:00:00').toISOString()},
        //   end: {dateTime: new Date('2017-07-21T11:00:00').toISOString()}
        // };
        //
        // console.log(body);
        //
        // this.calendarService.insertEvent(body, this.masseur).then((res) => {
        //   console.log(res);
        // });
        
        
        let profileModal = this.modalCtrl.create(AddEventPop, {data: item.start});
        profileModal.onDidDismiss((res: any) => {
            if (!!res) {
                let loader = this.loadingCtrl.create({
                    spinner: 'hide',
                    content: '<img src="./assets/icon/massage.gif">',
                });
                loader.present();
                
                
                this.calendarService.insertEvent(res, this.masseur).then((res) => {
                    this.getCalendarEvents(this.week[this.curDayId].params, this.masseur);
                    loader.dismiss();
                });
            }
        });
        profileModal.present();
    }
    
    
    addHours(date, h) {
        date.setTime(date.getTime() + (h * 60 * 60 * 1000));
        return date;
    }
    
    
    doRefresh(refresher) {
        setTimeout(() => {
            this.getCalendarEvents(this.week[this.curDayId].params, this.masseur);
            refresher.complete();
        }, 2000);
    }
    
    timeLine(){
        for (let i = 0; i < this.hrs.length; i++) {
            let curTime = new Date(this.hrs[i].start);
            let curTimeEnd = this.addHours(new Date(this.hrs[i].start), 1);
    
    
            let curDay = this.datePipe.transform(new Date(this.hrs[i].start), 'd');
            let timeLineDay = this.datePipe.transform(new Date, 'd');
            
            
            let timeLineHr = +this.datePipe.transform(new Date, 'HHmm');
            let curTimeHr = +this.datePipe.transform(curTime, 'HHmm');
            let curTimeEndHr = +this.datePipe.transform(curTimeEnd, 'HHmm');
        
        
            if (timeLineHr > curTimeHr && timeLineHr < curTimeEndHr && curDay == timeLineDay) {
                this.hrs[i].time_line = this.datePipe.transform(new Date, 'mm');
            }
        }
    }
}

