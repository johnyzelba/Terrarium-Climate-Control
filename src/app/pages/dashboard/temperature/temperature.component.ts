import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Temperature, TemperatureData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
 
@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy, OnInit {

  private alive = true;
  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
              private temperatureService: TemperatureData,
              ) {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.colors = config.variables;
    });

  }

  getTemperature() : void {
    this.temperatureService.getTemperatureData().subscribe((temperatureData) => {
       this.temperatureData = temperatureData;
       this.temperature = this.temperatureData.value;
       this.temperatureOff = this.temperatureData.temperatureOff;
      });
  }

  ngOnInit(): void {
    this.getTemperature();
    
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
