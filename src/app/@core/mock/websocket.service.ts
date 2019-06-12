import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';

@Injectable()
export class WebSocketService {
  ws: WebSocket;

  CreateObsSock(url: string): Observable<string>{
    this.ws = new WebSocket(url);
    return new Observable(
      Observer => {
        this.ws.onmessage = (event) => Observer.next(event.data);
        this.ws.onerror = (event) => Observer.error(event);
        this.ws.onclose = (event) => Observer.complete();
      }
    );
  }
   
  sendMessage(message: string){
    //message = JSON.stringify(message);
    //console.log(message);
    this.ws.send(message);
  }

}
