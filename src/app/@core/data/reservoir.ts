import { Observable } from 'rxjs';

export interface Reservoir {
  waterLvl: number;
  waterTemp: number;
  waterLvlAnimationBorder: number;
}

export abstract class ReservoirData {
  abstract getTimepickerData(): Observable<Reservoir>;
}
