import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils';
import { SensorsdataChart, SensorsdataData } from '../../../../@core/data/sensorsdata';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-sensorsdata-chart',
  styleUrls: ['./sensors-data-chart.component.scss'],
  template: `
    <div echarts
         [options]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class SensorsdataChartComponent implements AfterViewInit, OnInit, OnDestroy {

  private alive = true;
  @Input() series: SensorsdataChart[];
  option: any;
  @Input() echartsIntance: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService,
              private sensorsdataService: SensorsdataData) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit(): void {
    this.themeSubscription = this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const eTheme: any = config.variables.sensorsdata;
        this.option = {
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 80,
            containLabel: true,

          },
          color: [ '#b7cdfa', '#9abbff', '#75a1fc', '#5d81cc'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              label: {
                backgroundColor: '#b7cdfa',
              },
              lineStyle: {
                color: '#ffffff',
                width: 2,
                opacity: 0.3,
              },
            },
            textStyle: {
              color: eTheme.tooltipTextColor,
              fontSize: 18,
              fontWeight: eTheme.tooltipFontWeight,
            },
            position: 'top',
            backgroundColor: eTheme.tooltipBg,
            borderColor: eTheme.tooltipBorderColor,
            borderWidth: 3,
            formatter: 'Temperture: {c0} °C<br/>Moisture: {c1}%<br/>EC: {c2} ppm<br/>PH: {c3} ',
            extraCssText: eTheme.tooltipExtraCss,
          },
          legend: {
            data: ['Temperture', 'Moisture', 'EC', 'PH'],
            textStyle: {
              color: '#181818',
              fontSize: '1.25rem',
              fontFamily: "Exo",
              padding: 10,
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 25,
            data: ['08:30', '09:00', '09:30', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: eTheme.xAxisTextColor,
              fontSize: 18,
            },
            axisLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
                width: '2',
              },
            },
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: eTheme.yAxisSplitLine,
                width: '1',
              },
            },
          },
        };
    },
);
  }

  onChartInit(echarts) {
    this.sensorsdataService.getChartData().pipe(takeWhile(() => this.alive))
    .subscribe((chartData: SensorsdataChart[] ) => {
    this.series = chartData; 
    this.echartsIntance = echarts;
   },
   err => {
     console.log("eror");
   },
   () => {
    this.echartsIntance.setOption({
      series: this.series
    });
   });
    
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
