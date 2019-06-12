import { Observable } from 'rxjs';

export interface Humidity {
  value: number;
  min: number;
  max: number;
  humidityOff: boolean;
}

export abstract class HumidityData {
  abstract getTemperatureData(): Observable<Humidity>;
}
