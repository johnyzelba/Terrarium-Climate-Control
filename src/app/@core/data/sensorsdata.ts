import { Observable } from 'rxjs';

export interface Month {
  month: string;
  delta: string;
  down: boolean;
  kWatts: string;
  cost: string;
}

export interface SensorsdataChart {
  name: string,
  type: string,
  smooth: boolean,
  stack: string,
  symbolSize: number,
  itemStyle: {
    normal: {
      opacity: number,
    },
    emphasis: {
      color: string,
      borderWidth: number,
      opacity: number,
    },
  },
  areaStyle: { normal: { opacity:number} },
  data: number[]
}

export abstract class SensorsdataData {
  abstract getChartData(): Observable<SensorsdataChart[]>;

}
