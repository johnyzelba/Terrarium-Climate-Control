import {Component, OnDestroy, OnInit} from '@angular/core';
import { Timepicker, TimepickerData } from '../../../@core/data/timepicker';
import { NbThemeService } from '@nebular/theme';
import { WebSocketService } from '../../../@core/mock/websocket.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'ngx-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],

})
export class TimepickerComponent implements OnDestroy, OnInit{
   
  private alive = true;
  timepickerData: Timepicker;
  endTime: {hour: number, minute: number};
  startTime: {hour: number, minute: number};
  meridian: boolean;
  ws: WebSocket;
  url:string;

  constructor(private theme: NbThemeService,
    private timepickerService: TimepickerData,
    private wsServise: WebSocketService,
    ) {      
      this.url = environment.webSocketUrl;
      this.wsServise.CreateObsSock(this.url)
      .subscribe(
        data => {
          try {
            var parsedObject = JSON.parse(<string>data);
          } catch (event) {
            console.log("ws: lightTimer: Cannot parse data : " + event);
          }
          switch(parsedObject.id) {
            case 'lightTimer': {
              console.log("ws: lightTimer: Recived from server : " + parsedObject.data);
              this.timepickerData = parsedObject.data;
            }
            case 'dashboard': {
              console.log("ws: dashboard: Recived from server : " + parsedObject.data.lightTimer);
              this.timepickerData = parsedObject.data.lightTimer;
            }
          }
        },
        err => console.log(err),
        () => console.log('ws: lightTimer: Observable stream is complete')
      );

    }

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  getTimepicker() : void {
    this.timepickerService.getTimepickerData().subscribe((timepickerData) => {
       this.timepickerData = timepickerData;
      });
  }

  SendDataToServer() {
    console.log('ws: lightTimer: Sending to server' + {
      id: 'lightTimer', 
      data: this.timepickerData
    });
    this.wsServise.sendMessage(JSON.stringify( {
      id: 'lightTimer', 
      data: this.timepickerData
    }));
  }

  ngOnInit(): void {    
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
