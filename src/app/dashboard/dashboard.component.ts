import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'
import { timer, Observable } from "rxjs"
import { BehaviorSubject } from 'rxjs'
import { VisualisationComponent } from "../visualisation/visualisation.component"
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';


@Component({
  providers:[VisualisationComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ot: OtInterfaceService, private comp: VisualisationComponent) { }

  public data = {
    data: [
      { x: [0,1,2,3], y: [ 0, 7.729109045048115, 6.98580907441182, 4.88277841409298  ], type: 'scatter', name:"data1"},
    ],
    layout: {title: 'Reaction flow'}
  };




  LED: boolean = false
  Pump: boolean = false
  loading: boolean = false
  loading_pump: boolean = false
  stop_flow_stauts:boolean = false
  timer_status:boolean = false
  timer_automated_measurement:boolean = false
  loop = true
  number = 1
  time =  new Date()
  reactionDuration = 10000
  //timer_reacation_time = timer(this.reactionDuration)
  timer_LED = timer(5000)
  timer_measurement_time:any
  user = new BehaviorSubject(this.data);
  enzymeAdded = false


  ngOnInit(): void {
    Plotly.newPlot('pagegraph', this.data.data, this.data.layout)
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

  startPump2() {
    this.loading_pump = true
    this.ot.start_pump_2().subscribe((e) => {
      console.log(e)
    })
  }

  stopPump2() {
    this.loading_pump = true
    this.ot.stop_pump_2().subscribe((e) => {
      console.log(e)
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
    console.log("start Measurement runs")
    this.loading_pump = true
    this.ot.startMeasurement().subscribe((e) => {
      console.log(e)
    })
  }

  start_experiment(){
    this.startTimer()
  }

  setTime(){
    this.time = new Date()
    this.time.setMilliseconds(this.time.getMilliseconds()+this.reactionDuration)
  }
  
  startTimer() {
    console.log("hallo")
/*    
    console.log("startTimer")
    this.setTime()
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
  */
}

  printOutTree(){
    console.log("3")
  }

  startTimerTests(){

    let timer_reacation_time = timer(this.reactionDuration)

    console.log("enzyme added", this.enzymeAdded)
    console.log("start Measurement runs")
    timer_reacation_time.subscribe(()=>{
      this.timer_automated_measurement = true
      console.log("timer python has started")
      if(this.enzymeAdded==true){
      this.reactionDuration = 1800000
      }
      this.ot.automated_system().subscribe((e) => {
        
        console.log("timer_has_started")
        console.log(e+this.number)
        console.log(e["butanal"]["concentration"])
        this.number++
        
        console.log("the reaction duration is now:", this.reactionDuration)

        if (this.number <100){
          this.startTimerTests()
        }
        else if(this.number>=100){
          console.log("system has finished")
        }
        this.timer_automated_measurement = false

        let values = this.user.getValue()
        let value1 = values.data[0]
        console.log("value1", value1)
        let xarray = value1.x
    
        console.log("xarray", xarray)
        let last_entry = xarray[xarray.length-1]
        xarray.push(last_entry+1)
        
        let yarray = value1.y

        yarray.push(e["butanal"]["concentration"])

        let update = {data: [
          { x: xarray, y: yarray, type: 'scatter', name:"data1"},
        ],
        layout: {title: 'Reaction flow'}
        }
        Plotly.update('pagegraph', this.data.data, this.data.layout)

        console.log(this.number)
    
        console.log("reaction time is", this.reactionDuration)
        this.setTime()

      })})
  }

  addNumber(){
   
    
    let values = this.user.getValue()
    let value1 = values.data[0]
    console.log("value1", value1)
    let xarray = value1.x

    console.log("xarray", xarray)
    let last_entry = xarray[xarray.length-1]
    
    xarray.push(last_entry+1)
    console.log("new x array", xarray)
  
  
    let yarray = value1.y

    yarray.push(last_entry*2)
    console.log("new y array",yarray)
    let update = 
      {data: [
        { x: xarray, y: yarray, type: 'scatter', name:"data1"},
      ],
      layout: {title: 'Reaction flow'}
      }
    this.user.next(update)
    Plotly.update('pagegraph', this.data.data, this.data.layout)
    
    console.log("data object is:", this.data)

  }










}

