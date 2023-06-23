import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OtInterfaceService {

  constructor(private http:HttpClient) { }

  submit_BioCatHub_data(data_model):Observable<any> {
    console.log("es funktioniert")
    let bch_model = JSON.stringify(data_model)
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    window.alert("BioCatHub-submission")
    //return this.http.post<any>("http://127.0.0.1:5000/retrobiohub/lightCas",bch_model, {headers:{'Content-Type': 'application/json'}})
    return this.http.post<any>("https://retrobiohub.org/retrobiohub/lightCas",bch_model, {headers:{'Content-Type': 'application/json'}})
  }

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
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/start_pump_2")
  }
  stop_pump_2():Observable<any> {
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_pump_2")
  }

  start_pump_3():Observable<any> {
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/start_pump_3")
  }

  stop_pump_3():Observable<any> {
    console.log("automated system")
    return this.http.get<any>("http://127.0.0.1:5000/api/ot/stop_pump_3")
  }

  startReaction2(time):Observable<any> {
    console.log("automated system")
    let pump_duration = JSON.stringify({duration:time})
    return this.http.post<any>("http://127.0.0.1:5000/api/ot/reaction2",pump_duration,{headers:{'Content-Type': 'application/json'}} )

  }

}
