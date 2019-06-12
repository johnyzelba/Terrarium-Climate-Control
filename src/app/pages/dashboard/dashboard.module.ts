import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { SvgPolygonModule, SvgPathModule } from 'angular-svg'
import { ThemeModule } from '../../@theme/theme.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { PlantsComponent } from './plants/plants.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { HumidifierComponent } from './humidifier/humidifier.component';
import { HumidifierDraggerComponent } from './humidifier/humidifier-dragger/humidifier-dragger.component';
import { SensorsdataComponent } from './sensors-data/sensors-data.component';
import { SensorsdataChartComponent } from './sensors-data/sensors-data-chart/sensors-data-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TimepickerComponent,
    ReservoirComponent,
    PlantsComponent,
    CalendarComponent,
    DayCellComponent,
    TemperatureDraggerComponent,
    TemperatureComponent,
    HumidifierComponent,
    HumidifierDraggerComponent,
    SensorsdataComponent,
    SensorsdataChartComponent,
    WeatherComponent,
    SolarComponent,
  ],
})
export class DashboardModule { }
