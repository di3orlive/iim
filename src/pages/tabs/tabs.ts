import { Component } from '@angular/core';
import { ServicesPage } from '../services/services';
import { ContactPage } from '../contact/contact';
import { CalendarPage } from '../calendar/calendar';
import {CalendarService} from "../../app/services/calendar.service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CalendarPage;
  tab2Root = ServicesPage;
  tab3Root = ContactPage;

  constructor(
    private calendarService: CalendarService,
  ) {
    this.calendarService.handleClientLoad();
  }
}
