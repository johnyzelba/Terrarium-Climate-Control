import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { SensorsdataChart, SensorsdataData } from '../data/sensorsdata';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SensorsdataService extends SensorsdataData {

  
  private chartPoints = [
    26, 28, 29, 28,
    26, 24, 23, 24,
    26, 28,
  ];
  private chartPoints2 = [
    720, 200, 145, 130,
    130, 145, 200, 570,
    635, 660, 670, 670,
    660, 630, 580, 460,
    380, 350, 340, 340,
    340, 340, 340, 340,
    340, 340, 340,
  ];
 
  constructor(private http:HttpClient) {
    super();
  }

  getChartData(): Observable<SensorsdataChart[]> {
    return this.http.get<SensorsdataChart[]>('http://10.0.0.5:3000/sensorsdata', {responseType: 'json'});
  }

}
