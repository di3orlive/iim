import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Subject} from "rxjs";
import {ModalController, ToastController} from 'ionic-angular';
import {CalendarService} from "../../app/services/calendar.service";
import {AddEventPop} from "../../app/pops/add-event/add-event.pop";

@Component({
  selector: 'page-home',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
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


  week = [];


  constructor(
    private calendarService: CalendarService,
    private datePipe: DatePipe,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
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


  getCalendarEvents(params) {
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


    this.calendarService.getDayEvents(params).subscribe((res: any) => {
      this.events = [];

      res.items.forEach((item) => {
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
    this.viewDate = this.week[id].date;

    this.week.forEach((it) => {
      it.isActive = false;
    });

    this.week[id].isActive = true;

    this.getCalendarEvents(this.week[id].params);
  }


  addEvent(date) {
    let now = +new Date();
    let end = new Date(date);
    if (now >= +end) {
      let toast = this.toastCtrl.create({
        message: 'You can\'t add old event',
        duration: 3000
      });
      toast.present();
      return;
    }


    let profileModal = this.modalCtrl.create(AddEventPop, { data: date });
    profileModal.onDidDismiss((res: any) => {
      if (!!res) {




        const body = {
          summary: res.summary,
          description: res.description,
          end: {dateTime: res.end},
          start: {dateTime: res.start}
        };

        this.calendarService.insertEvent(body).subscribe((res) => {
          console.log(res);
        });

        // console.log(res);
        // this.events.push({
        //   start: res.start,
        //   end: res.end,
        //   title: res.summary,
        //   color: this.colors.future
        // });
        // this.refresh.next();
      }
    });
    profileModal.present();
  }
}

