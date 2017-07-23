import { Component } from '@angular/core';
import { ServicesPage } from '../services/services';
import { ContactsPage } from '../contacts/contacts';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CalendarPage;
  tab2Root = ServicesPage;
  tab3Root = ContactsPage;

  constructor(
  ) {
  }
}
