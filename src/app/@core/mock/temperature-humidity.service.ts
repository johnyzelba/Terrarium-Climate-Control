import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureData, Temperature } from '../data/temperature-humidity';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TemperatureHumidityService extends TemperatureData {

  constructor(private http:HttpClient){
    super();
  }

  
  getTemperatureData(): Observable<Temperature> {
    return this.http.get<Temperature>('http://10.0.0.5:3000/temperture', {responseType: 'json'});
  }

}
