import {Injectable} from '@angular/core';

declare const gapi;

@Injectable()
export class CalendarService {
    
    constructor() {
    
    }
    
    getDayEvents(body, masseur) {
        let CALENDAR_ID: any;
        if (masseur === 'inna') {
            CALENDAR_ID = '6orus9@gmail.com';
        } else {
            CALENDAR_ID = 'innywk4@gmail.com';
            // CALENDAR_ID = 'evilrodi3@gmail.com';
        }
       
    
    
        return new Promise(function (resolve) {
            gapi.load('client:auth2', initClient);
    
            function initClient() {
                gapi.client.init({
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                }).then(() => {
                    return gapi.auth.authorize({
                        'client_id': '432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com', // me
                        // 'client_id': '374217069378-t52io7gg6ngr7499jo820upqgqtua1gb.apps.googleusercontent.com', // inna
                        'scope': 'https://www.googleapis.com/auth/calendar',
                        'immediate': true
                    });
                }).then(() => {
                    gapi.client.setApiKey('AIzaSyDgOcEsgDv3xPW_r5HYiFMuTTiSpIfVG5U'); // me
                    // gapi.client.setApiKey('AIzaSyBj2_u7sLXWWbbS0-muvlA7U3831Oh2Mi8'); // inna
    
    
                    const request = gapi.client.calendar.events.list({
                        'calendarId': CALENDAR_ID,
                        "singleEvents" : true,
                        "orderBy" : "startTime",
                        "timeMin":  body.timeMin,
                        "timeMax":  body.timeMax
                    });
                    
                
                    request.execute((event) => {
                        resolve(event);
                    });
                });
            }
        });
    }
    
    insertEvent(body, masseur) {
        let CALENDAR_ID: any;
        if (masseur === 'inna') {
            CALENDAR_ID = 'innywk4@gmail.com';
        } else {
            CALENDAR_ID = '6orus9@gmail.com';
            // CALENDAR_ID = 'evilrodi3@gmail.com';
        }
        
        
        return new Promise(function (resolve) {
            gapi.load('client:auth2', initClient);
            
            function initClient() {
                gapi.client.init({
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
                }).then(() => {
                    return gapi.auth.authorize({
                        'client_id': '432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com',
                        'scope': 'https://www.googleapis.com/auth/calendar',
                        'immediate': true
                    });
                }).then(() => {
                    gapi.client.setApiKey('AIzaSyDgOcEsgDv3xPW_r5HYiFMuTTiSpIfVG5U');
                    
                    const request = gapi.client.calendar.events.insert({
                        'calendarId': CALENDAR_ID,
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













