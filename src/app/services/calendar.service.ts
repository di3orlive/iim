import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {GlobalVariables} from '../globals';

declare const gapi;

@Injectable()
export class CalendarService {
  gv = GlobalVariables;


  constructor(
    private http: Http
  ) {

  }

  getDayEvents(params){
    const options = {
      key: this.gv.CALENDAR_KEY,
      orderBy: 'startTime',
      singleEvents: true,
      timeMin: params.timeMin,
      timeMax: params.timeMax
    };

    return this.http.get(`${this.gv.CALENDAR_URL}events`, {params: options})
      .catch((err: any) => Observable.throw(err).catch(err => Observable.of(err)))
      .map((res) => res.json());
  }

  insertEvent(body){
    // {
    //   "summary": "FROM API",
    //   "end": {
    //   "dateTime": "2017-07-20T19:00:00Z"
    // },
    //   "start": {
    //   "dateTime": "2017-07-20T18:00:00Z"
    // },
    //   "description": "description KOKO",
    // }


    let headers = new Headers();
    headers.append('Authorization', 'Bearer uAXqQCin5WR4dVBsOM0VXR48');



    // 432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com
    // uAXqQCin5WR4dVBsOM0VXR48

    return this.http.post(`${this.gv.CALENDAR_URL}events`, body, {headers: headers})
      .catch((err: any) => Observable.throw(err).catch(err => Observable.of(err)))
      .map((res) => res.json());
  }


  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.setApiKey('AIzaSyDgOcEsgDv3xPW_r5HYiFMuTTiSpIfVG5U');
    window.setTimeout(() => {
      gapi.auth.authorize({
        client_id: '432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar',
        immediate: true
      }, (res) => {
        console.log(res);
      });
    },1);



    // gapi.client.init({
    //   discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    //   apiKey: 'AIzaSyDgOcEsgDv3xPW_r5HYiFMuTTiSpIfVG5U',
    //   clientId: '432738914505-tgpg021nlq2d1gvn2sbv57l5u7o6s6rm.apps.googleusercontent.com',
    //   scope: 'https://www.googleapis.com/auth/calendar'
    // }).then((res) => {
    //   console.log(res);
    //   // https://developers.google.com/google-apps/calendar/quickstart/js
    // });
  }

}













