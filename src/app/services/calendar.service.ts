import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {GlobalVariables} from '../globals';

declare const gapi;

@Injectable()
export class CalendarService {
    gv = GlobalVariables;
    
    
    constructor(private http: Http) {
    
    }
    
    getDayEvents(params, masseur) {
        let CONST: any;
        if (masseur === 'inna') {
            CONST = this.gv.INNA;
        } else {
            CONST = this.gv.IRA;
        }
        
        const options = {
            key: CONST.API_KEY,
            orderBy: 'startTime',
            singleEvents: true,
            timeMin: params.timeMin,
            timeMax: params.timeMax
        };
        
        return this.http.get(`${CONST.CALENDAR_URL}events`, {params: options})
            .catch((err: any) => Observable.throw(err).catch(err => Observable.of(err)))
            .map((res) => res.json());
    }
    
    insertEvent(body, masseur) {
        // const body = {
        //   summary: 'JS CLIENT',
        //   description: "'KOKOKO",
        //   end: {dateTime: '2017-21-07T10:00:00Z'},
        //   start: {dateTime: '2017-21-07T12:00:00Z'}
        // };
        
        
        let CONST: any;
        if (masseur === 'inna') {
            CONST = this.gv.INNA;
        } else {
            CONST = this.gv.IRA;
        }
        
        
        return new Promise(function (resolve) {
            gapi.load('client:auth2', initClient);
            
            function initClient() {
                gapi.client.init({
                    discoveryDocs: CONST.DISCOVERY_DOCS,
                    clientId: CONST.CLIENT_ID,
                    scope: CONST.SCOPES
                }).then(() => {
                    return gapi.auth.authorize({
                        'client_id': CONST.CLIENT_ID,
                        'scope': CONST.SCOPES,
                        'immediate': true
                    }, () => {
                    });
                }).then(() => {
                    gapi.client.setApiKey(CONST.API_KEY);
                    
                    const request = gapi.client.calendar.events.insert({
                        'calendarId': CONST.CALENDAR_ID,
                        'resource': body
                    });
                    
                    request.execute((event) => {
                        resolve(event);
                    });
                });
            }
        });
    }
    
    
}













