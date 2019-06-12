import { Observable } from 'rxjs';

export interface Temperature {
  value: number;
  min: number;
  max: number;
  temperatureOff: boolean;
}

export abstract class TemperatureData {
  abstract getTemperatureData(): Observable<Temperature>;
}
