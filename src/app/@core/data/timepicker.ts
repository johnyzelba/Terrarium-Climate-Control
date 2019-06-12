import { Observable } from 'rxjs';

export interface Timepicker {
  startTime: {hour: number, minute: number};
  endTime: {hour: number, minute: number};
  meridian: boolean;
  onOffSwitch: boolean;
}

export abstract class TimepickerData {
  abstract getTimepickerData(): Observable<Timepicker>;
}
