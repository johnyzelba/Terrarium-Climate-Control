import { Observable } from 'rxjs';

export interface dashboardData {
  onOffDevices: {
    light: boolean,
    ac: boolean,
    humidifier: boolean,
    waterPump: boolean,
  },
  sensorsData: {
    temperture: [{value:number, timeStamp: Date}],
    humidity: [{value:number, timeStamp: Date}],
    avgSoilMoisture: [{value:number, timeStamp: Date}],
    reservoirEc: [{value:number, timeStamp: Date}],
    reservoirPh: [{value:number, timeStamp: Date}],
  },
  acController: {
    minValue: number,
    maxValue: number,
    value: number,
    onOffSwitch: boolean,
  },
  humidifierController: {
    minValue: number,
    maxValue: number,
    value: number,
    onOffSwitch: boolean,
  },
  lightController: {
    EndTime: {hour: number, minute: number},
    StartTime: {hour: number, minute: number},
  },
  reservoir: {
    waterLevel: {hour: number, minute: number},
    waterTemp: {hour: number, minute: number},
  },
  plants: {
    plant: [{
      id: number, 
      name: string,
      soilMoisture: number,
      plantingDate: Date,
      LifeCycle: Date,
    }],
  },
  consumption: {
    monthStart: Date,
    electricityConsumption: number,
    waterConsumption: number,
  }
}


export abstract class UserData {
  abstract getUsers(): Observable<dashboardData>;

}
