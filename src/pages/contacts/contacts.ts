import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {ContactsArticlePage} from "../contacts-article/contacts-article";

@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html'
})
export class ContactsPage {
    contacts = [
        {
            name: 'Inna',
            img: './assets/massagists/inna.jpg',
            address: 'hata dimu',
            about: 'ЧНУ ім.Б. Хмельницького ННІ фізичної культури , спорту і здоров\'я. Масажист-реабілітолог',
            phone: '(096) 201-57-38'
        },
        {
            name: 'Ira',
            img: './assets/massagists/ira.jpg',
            address: 'matrix',
            about: 'ЧНУ ім.Б. Хмельницького ННІ фізичної культури , спорту і здоров\'я. Масажист-реабілітолог',
            phone: '(068) 635-67-82',
            inst: 'iryna_kompaniits_',
        }
    ];


    constructor(private navCtrl: NavController) {
    
    }
    
    goToOtherPage(item) {
        this.navCtrl.push(ContactsArticlePage, {params: item});
    }
}
