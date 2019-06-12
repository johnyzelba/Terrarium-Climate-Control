import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { SensorsdataChart, SensorsdataData } from '../../../@core/data/sensorsdata';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-sensorsdata',
  styleUrls: ['./sensors-data.component.scss'],
  templateUrl: './sensors-data.component.html',
})
export class SensorsdataComponent implements OnDestroy {

  private alive = true;

  echartsIntance: any;
  chartData: SensorsdataChart[];
  type = 'week';
  types = ['week', 'month', 'year'];
  currentTheme: string;
  themeSubscription: any;

  constructor(private sensorsdataService: SensorsdataData,
              private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  calcAvg(Data: Array<number>): number { 
    var sum = 0; 
    for(var i = 0; i < Data.length; i++){
        sum += Data[i];
    }

    var avg = sum/Data.length;

    return avg; 
  }
  
  ngOnInit() {
    this.sensorsdataService.getChartData().subscribe((SensorsdataData) => {
      this.chartData = SensorsdataData;
     });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
