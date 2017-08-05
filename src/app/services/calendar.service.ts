import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CalendarService {
    // api = 'http://localhost:8081';
    api = 'https://8081-dot-2981762-dot-devshell.appspot.com';
    
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
    }
    
    
    
    
    
    
    insertEvent(params, masseur) {
        let CALENDAR_ID: any;
        if (masseur === 'inna') {
            CALENDAR_ID = '6orus9@gmail.com';
        } else {
            CALENDAR_ID = 'innywk4@gmail.com';
        }
        
        
        const body = {
            calendar_id: CALENDAR_ID,
            body: params
        };
        
        
        return this.http.post(`${this.api}/event`, body)
            .map((res) => res.json())
            .catch((err: any) => this.checkForErr(err));
    }
}













