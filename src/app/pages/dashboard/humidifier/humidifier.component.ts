import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Humidifier, HumidifierData } from '../../../@core/data/humidifier';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-humidifier',
  styleUrls: ['./humidifier.component.scss'],
  templateUrl: './humidifier.component.html',
})
export class HumidifierComponent implements OnDestroy, OnInit {

  private alive = true;

  humidifierData: Humidifier;
  humidifier: number;
  humidifierOff = false;
  humidifierMode = 'cool';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
              private humidifierService: HumidifierData) {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.colors = config.variables;
    });
  }

  getHumidity() : void {
    this.humidifierService.getHumidifierData().subscribe((humidifierData: Humidifier) => {
      this.humidifierData = humidifierData;
      this.humidifier = this.humidifierData.value;
    });
  }

  ngOnInit(): void {
    this.getHumidity();
    
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
