import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule} from "@angular/http";
import {DatePipe} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdInputModule, MdSelectModule} from '@angular/material';
import 'hammerjs';


import {MyApp} from './app.component';
import {ServicesPage} from '../pages/services/services';
import {CalendarPage} from '../pages/calendar/calendar';
import {TabsPage} from '../pages/tabs/tabs';
import {CalendarService} from "./services/calendar.service";
import {AddEventPop} from "./pops/add-event/add-event.pop";
import {ServicesArticlePage} from "../pages/service-article/service-article";
import {ServicesService} from "./services/services.service";
import {CommonService} from "./services/common";
import {ContactsPage} from "../pages/contacts/contacts";
import {ContactsArticlePage} from "../pages/contacts-article/contacts-article";




@NgModule({
    declarations: [
        MyApp,
        ServicesPage,
        CalendarPage,
        ServicesArticlePage,
        TabsPage,
        AddEventPop,
        ContactsArticlePage,
        ContactsPage
    ],
    entryComponents: [
        MyApp,
        ServicesPage,
        CalendarPage,
        ServicesArticlePage,
        TabsPage,
        AddEventPop,
        ContactsArticlePage,
        ContactsPage
    ],
    bootstrap: [IonicApp],
    imports: [
        HttpModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
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
        CommonService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}

