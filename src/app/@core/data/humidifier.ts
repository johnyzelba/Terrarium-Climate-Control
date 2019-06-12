import { Observable } from 'rxjs';

export interface Humidifier {
  value: number;
  min: number;
  max: number;
  humidityOff: boolean;
}

export abstract class HumidifierData {
  abstract getHumidifierData(): Observable<Humidifier>;
}
