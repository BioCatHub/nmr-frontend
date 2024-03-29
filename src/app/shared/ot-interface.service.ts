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

  inactiveReaction():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/inactivate")
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
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/measure")
  }

  stopFlow():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_flow")
  }

  calibratePump():Observable<any> {
    console.log("es funktioniert")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/test_pump")
  }

  automated_system():Observable<any> {
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/automated_system")
  }

  start_pump_2():Observable<any> {
    console.log("dosage pump 1")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/start_pump_2")
  }
  stop_pump_2():Observable<any> {
    console.log("dosage pump 1 stop")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_pump_2")
  }

  start_pump_3():Observable<any> {
    console.log("dosage pump 2")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/start_pump_3")
  }

  stop_pump_3():Observable<any> {
    console.log("dosage pump 2 stop")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_pump_3")
  }

  startReaction2(time):Observable<any> {
    console.log("automated system")
    let pump_duration = JSON.stringify({duration:time})
    return this.http.post<any>("http://127.0.0.1:5000/api/ot/reaction2",pump_duration,{headers:{'Content-Type': 'application/json'}} )
  }

}
