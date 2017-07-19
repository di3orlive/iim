import { NgModule, ErrorHandler } from '@angular/core';
import {HttpModule} from "@angular/http";
import { DatePipe } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateFormatterParams,
  CalendarEvent
} from 'angular-calendar';
import {MdInputModule, MdSelectModule} from '@angular/material';
import 'hammerjs';


import { MyApp } from './app.component';
import { ServicesPage } from '../pages/services/services';
import { ContactPage } from '../pages/contact/contact';
import { CalendarPage } from '../pages/calendar/calendar';
import { TabsPage } from '../pages/tabs/tabs';
import {CalendarService} from "./services/calendar.service";
import {AddEventPop} from "./pops/add-event/add-event.pop";
import {ServicesArticlePage} from "../pages/service-article/service-article";
import {ServicesService} from "./services/services.service";


export class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  dayTooltip(event: CalendarEvent): string {
    return;
  }
}


@NgModule({
  declarations: [
    MyApp,
    ServicesPage,
    ContactPage,
    CalendarPage,
    ServicesArticlePage,
    TabsPage,
    AddEventPop
  ],
  entryComponents: [
    MyApp,
    ServicesPage,
    ContactPage,
    CalendarPage,
    ServicesArticlePage,
    TabsPage,
    AddEventPop
  ],
  bootstrap: [IonicApp],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      },
      eventTitleFormatter: {
        provide: CalendarEventTitleFormatter,
        useClass: CustomEventTitleFormatter
      }
    }),

    MdInputModule,
    MdSelectModule,

    IonicModule.forRoot(MyApp)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CalendarService,
    DatePipe,
    ServicesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}


