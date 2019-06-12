import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservoirData, Reservoir } from '../data/reservoir';
import {WebSocketService} from './websocket.service';


@Injectable()
export class ReservoirService extends ReservoirData {

  public resSub: Subject<Reservoir>;
  constructor(private http:HttpClient){
    super();

  }

  
  getTimepickerData(): Observable<Reservoir> {
    return this.http.get<Reservoir>('http://10.0.0.5:3000/reservoir', {responseType: 'json'});
  }

}
