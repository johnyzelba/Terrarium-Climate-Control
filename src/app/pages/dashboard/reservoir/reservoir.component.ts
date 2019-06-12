import {Component, OnDestroy, OnInit} from '@angular/core';
import { Reservoir, ReservoirData } from '../../../@core/data/reservoir';
import { WebSocketService } from '../../../@core/mock/websocket.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'ngx-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss'],


})
export class ReservoirComponent implements OnDestroy, OnInit{
   
  private alive = true;
  reservoirData: Reservoir;
  waterLvl: number;
  waterTemp: number;
  maxWaterLvl = 100; // max water lvl for reservoir
  waterLvlAnimationBorder = 1;
  ws: WebSocket;
  url:string;
  
  constructor(private reservoirService: ReservoirData,
    private wsServise: WebSocketService,
    ) {
      this.url = environment.webSocketUrl;
      this.wsServise.CreateObsSock(this.url)
      .subscribe(
        data => {
          try {
            var parsedObject = JSON.parse(<string>data);
          } catch (event) {
            console.log("ws: reservoir: Cannot parse data : " + event);
          }
          if (parsedObject) 
            if (parsedObject.id == 'reservoir') {
              console.log("ws: reservoir: Recived from server : " + parsedObject.data);
              this.reservoirData.waterLvl = parsedObject.data.waterLvl;
              this.reservoirData.waterLvlAnimationBorder = this.reservoirData.waterLvl * 78 / 100;
            }
        },
        err => console.log(err),
        () => console.log('ws: reservoir: Observable stream is complete')
      );

    }

  getReservoir() : void {
    this.reservoirService.getTimepickerData().subscribe((reservoirData) => {
       this.reservoirData = reservoirData;
       this.reservoirData.waterLvl = reservoirData.waterLvl * 100 / this.maxWaterLvl;
       this.reservoirData.waterLvlAnimationBorder = reservoirData.waterLvl * 78 / this.maxWaterLvl;
       this.reservoirData.waterTemp = reservoirData.waterTemp;
      });
  }

  SendDataToServer() {
    console.log('ws: reservoir: Sending to server' + {id: 'reservoir', data: { waterLvl: this.reservoirData.waterLvl, waterTemp: this.reservoirData.waterTemp,}});
    this.wsServise.sendMessage(JSON.stringify( {
      id: 'reservoir', 
      data: {
        waterLvl: this.reservoirData.waterLvl,
        waterTemp: this.reservoirData.waterTemp,
      }
    }));
  }

  ngOnInit(): void {   
    this.getReservoir(); 
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
