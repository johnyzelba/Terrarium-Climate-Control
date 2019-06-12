import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TimepickerData, Timepicker } from '../data/timepicker';

@Injectable()
export class TimepickerService extends TimepickerData {

  constructor(private http:HttpClient){
    super();
  }

  
  getTimepickerData(): Observable<Timepicker> {
    return this.http.get<Timepicker>('http://10.0.0.5:3000/timepicker', {responseType: 'json'});
  }

}
