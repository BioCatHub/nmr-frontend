import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'
import { timer, Observable } from "rxjs"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ot: OtInterfaceService) { }

  LED: boolean = false
  Pump: boolean = false
  loading: boolean = false
  loading_pump: boolean = false
  stop_flow_stauts:boolean = false
  timer_status:boolean = false
  timer_automated_measurement:boolean = false
  loop = true
  number = 0

  timer_reacation_time = timer(2000)
  timer_LED = timer(5000)
  timer_measurement_time:any


  ngOnInit(): void {

  }

  startLED() {
    this.loading = true
    this.ot.startLED().subscribe((e) => {
      console.log(e)
      this.LED = true;
      this.loading = false
    })
  }

  stopLED() {
    this.loading = true
    this.ot.stopLED().subscribe((e) => {
      console.log(e)
      this.LED = false;
      this.loading = false
    })
  }

  startPump() {
    this.loading_pump = true
    this.ot.startPump().subscribe((e) => {
      console.log(e)
      this.Pump = true
      this.loading_pump = false
    })
  }

  stopPump() {
    this.loading_pump = true
    this.ot.stopPump().subscribe((e) => {
      console.log(e)
      this.Pump = false
      this.loading_pump = false
    })
  }

  calibratePump() {
    this.stop_flow_stauts = true

    this.ot.calibratePump().subscribe((e) => {
      console.log(e)
      this.Pump = false
      this.stop_flow_stauts = false
    })
  }

  startMeasurement() {
    this.loading_pump = true
    this.ot.startMeasurement().subscribe((e) => {
      console.log(e)
    })
  }

  start_experiment(){
    this.startTimer()
  }
  
  startTimer() {
    
    console.log("startTimer")
    this.timer_reacation_time.subscribe((x) => 
    {console.log("LED läuft")  
    this.ot.startLED().subscribe((e) => {
    console.log(e)
    this.LED = true;
    this.loading = false
    this.timer_LED.subscribe(()=>{
      this.ot.stopLED().subscribe((e) => {
        console.log(e)
        this.LED = false;
        this.loading = false
      })
    })
    })
  } )
}

  printOutTree(){
    console.log("3")
  }

  startTimerTests(){
    this.timer_reacation_time.subscribe(()=>{
      this.timer_automated_measurement = true
      console.log("timer python has started")
      this.ot.automated_system().subscribe((e) => {
        
        console.log("timer_has_started")
        console.log(e+this.number)
        this.number++
        if (this.number <4){
          this.startTimerTests()
        }
        else if(this.number>=4){
          console.log("system has finished")
        }
        this.timer_automated_measurement = false
      })})
  }
}

