import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { HumidifierData, Humidifier } from '../data/humidifier';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HumidifierService extends HumidifierData {

  constructor(private http:HttpClient){
    super();
  }

  getHumidifierData(): Observable<Humidifier> {
    return this.http.get<Humidifier>('http://10.0.0.5:3000/humidity', {responseType: 'json'});

  }
}
