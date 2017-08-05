import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';

// declare const gapi;

@Injectable()
export class CalendarService {
    api = 'http://localhost:8081';
    
    constructor(private http: Http) {
    
    }
    
    checkForErr(err) {
        return Observable.throw(err).catch(err => Observable.of(err));
    }
    
    getDayEvents(params, masseur) {
        let CALENDAR_ID: any;
        if (masseur === 'inna') {
            CALENDAR_ID = '6orus9@gmail.com';
        } else {
            CALENDAR_ID = 'innywk4@gmail.com';
            // CALENDAR_ID = 'evilrodi3@gmail.com';
        }


        const body = {
            "singleEvents" : true,
            "orderBy" : "startTime",
            "timeMin":  params.timeMin,
            "timeMax":  params.timeMax
        };
        
        
        return this.http.get(`${this.api}/list`, {params: {calendar_id: CALENDAR_ID, body: body}})
            .map((res) => res.json())
            .catch((err: any) => this.checkForErr(err));
        
        
        
        

        // return new Promise((resolve, reject) => {
        //     gapi.load('client:auth2', initClient);
        //
        //     function initClient() {
        //         gapi.client.setApiKey('AIzaSyDde8BZLFU7lKkULJw4bFBEmHDXukivSfE');
        //
        //         gapi.client.init({
        //             discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        //         }).then(() => {
        //             return gapi.auth.authorize({
        //                 'client_id': '432738914505-o67kv9rqtv042shc8inaf84clmslir4v.apps.googleusercontent.com',
        //                 'scope': 'https://www.googleapis.com/auth/calendar',
        //                 'immediate': true
        //             });
        //         }).then((e) => {
        //             console.log(e);
        //             const request = gapi.client.calendar.events.list({
        //                 'calendarId': CALENDAR_ID,
        //                 "singleEvents" : true,
        //                 "orderBy" : "startTime",
        //                 "timeMin":  body.timeMin,
        //                 "timeMax":  body.timeMax
        //             });
        //
        //             request.execute((event) => {
        //                 resolve(event);
        //             });
        //         });
        //     }
        // });
    }
    
    insertEvent(params, masseur) {
        let CALENDAR_ID: any;
        if (masseur === 'inna') {
            CALENDAR_ID = '6orus9@gmail.com';
        } else {
            CALENDAR_ID = 'innywk4@gmail.com';
            // CALENDAR_ID = 'evilrodi3@gmail.com';
        }
    
    
    
        const body = {
            calendar_id: CALENDAR_ID,
            body: params
        };
        
    
        return this.http.post(`${this.api}/event`, body)
            .map((res) => res.json())
            .catch((err: any) => this.checkForErr(err));
        
        
        // return new Promise((resolve) => {
        //     gapi.load('client:auth2', initClient);
        //
        //     function initClient() {
        //         gapi.client.setApiKey('AIzaSyDde8BZLFU7lKkULJw4bFBEmHDXukivSfE');
        //
        //         gapi.client.init({
        //             discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        //         }).then(() => {
        //             return gapi.auth.authorize({
        //                 'client_id': '432738914505-o67kv9rqtv042shc8inaf84clmslir4v.apps.googleusercontent.com',
        //                 'scope': 'https://www.googleapis.com/auth/calendar',
        //                 'immediate': true
        //             });
        //         }).then((e) => {
        //             console.log(e);
        //
        //             const request = gapi.client.calendar.events.insert({
        //                 'calendarId': CALENDAR_ID,
        //                 'resource': body
        //             });
        //
        //             request.execute((event) => {
        //                 resolve(event);
        //             });
        //         });
        //     }
        // });
    }
}













