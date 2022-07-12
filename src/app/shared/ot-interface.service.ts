import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OtInterfaceService {

  constructor(private http:HttpClient) { }

  startLED():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/light_up")
  }

  stopLED():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/light_down")
  }

  startPump():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/start_pump")
  }

  stopPump():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_pump")
  }

  startMeasurement():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/nmr/start")
  }

  stopFlow():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_flow")
  }

  automated_system():Observable<any> {
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/automated_system")
  }


}
