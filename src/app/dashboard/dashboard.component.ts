import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'
import { timer, Observable } from "rxjs"
import { BehaviorSubject } from 'rxjs'
import { VisualisationComponent } from "../visualisation/visualisation.component"
import { ControlCommandsService } from "../shared/control-commands.service"
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';


@Component({
  providers: [VisualisationComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ot: OtInterfaceService,
    private comp: VisualisationComponent,
    private Cc: ControlCommandsService) { }

  data = {
    data: [
     { x: [], y: [], type: 'scatter', name: "3-OH-benzaldehyde" },
     { x: [], y: [], type: 'scatter', name: "Phenylacetylcarbinol" }
    ],
    layout: { title: 'Reaction flow' }
  };


  LED: boolean = false
  Inactivation: boolean = false
  Pump: boolean = false
  loading: boolean = false
  loading_pump: boolean = false
  stop_flow_stauts: boolean = false
  timer_status: boolean = false
  timer_automated_measurement: boolean = false
  loop = true
  number = 0
  time = new Date()
  reactionDuration = 10000
  //timer_reacation_time = timer(this.reactionDuration)
  timer_LED = timer(5000)
  timer_measurement_time: any
  //user = new BehaviorSubject(this.data);
  enzymeAdded = false
  timeOfFirstMeasurement: Date
  timeActualMeasurment: Date
  Molecules
  boundaries = { butanal: 3 }
  pump2
  pumpTimeReaction2 = 20


  ngOnInit(): void {
    Plotly.newPlot('pagegraph', this.data.data, this.data.layout)
    this.Molecules = this.Cc.instanciateMolecules("placeholder")
    this.runSwitch()
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
    this.loading_pump = false
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

  runSwitch() {
    let day: number = 7

    switch (day) {
      case 0:
        console.log("it is monday")
      case 1:
        console.log("it is tuesday")
      case 4:
        console.log("Donnerstag !!!!!!!!!!!!!!!!")
      default:
        console.log("Kein Tag!!!")

    }


  }


  setTime() {
    this.time = new Date()
    this.time.setMilliseconds(this.time.getMilliseconds() + this.reactionDuration)
  }

  startTimerTests() {

    console.log("Die nummer ist", this.number)

    if (this.number == 0) {
      this.timeOfFirstMeasurement = new Date()
    }

    let timer_reacation_time = timer(this.reactionDuration)
    // timer starting the reaction
    timer_reacation_time.subscribe(() => {
      this.timer_automated_measurement = true
      this.reactionDuration = this.Cc.setReactionDuration(this.enzymeAdded)
      // REST API call to start the measurement
      this.ot.automated_system().subscribe((e) => {

      // update plotly graph
        let data = this.Cc.updateMeasurmentData(this.data, e, this.timeOfFirstMeasurement)
        Plotly.update('pagegraph', data.data, this.data.layout)
        console.log("die data sind", data.data)

      // update Molecule Object

        this.Molecules = this.Cc.updateMolecules(e, this.Molecules, { buanal: 3 })
        this.number++
        this.timer_automated_measurement = false
        console.log(this.Molecules)
        console.log("der status ist", this.Molecules["butanal"]["status"])

      // extract decision from Molecule object

        let moleculeUpdate = this.Cc.caseDecision(this.number, this.Molecules, this.boundaries)
        let status = moleculeUpdate["status"]



        if (status == "finished"){
          console.log("Process has finished")
        }
        else if(status=="continue"){
          console.log("molecule object is",moleculeUpdate["content"] )
          this.Molecules = moleculeUpdate["content"]
          console.log("No action needed")
          this.startTimerTests()
        }

        else if(status == "cascade_step_1_finished"){            
          console.log("Cascade 1 has finished")
          this.Molecules = moleculeUpdate["content"]
          this.Inactivation = true
          this.ot.inactiveReaction().subscribe((e) => {
            this.Inactivation = false
            this.pump2 = true
            this.ot.startReaction2(this.pumpTimeReaction2).subscribe((e) => {
              console.log("reaction 2 has started")
              this.startTimerTests()
          })

        })
      }
      })
      })


    }



    /*
    
    if (this.number >= 100) {
      console.log("system has finished")
    }
    else if (this.Molecules["butanal"]["status"] == "not-started") {
      this.Molecules["butanal"]["status"] = "started"
      this.startTimerTests()
    }
    else if (this.Molecules["butanal"]["status"] == "started" && this.Molecules["butanal"]["latest_concentration"] <= this.boundaries["butanal"]) {
      this.Molecules["butanal"]["status"] == "finished"
      this.Inactivation = true
      this.ot.inactiveReaction().subscribe((e) => {
        this.Inactivation=false
        this.startTimerTests()
      })
    }
    */









/*
this.ot.automated_system().subscribe((e) => {

  console.log("timer_has_started")
  console.log(e + this.number)
  console.log(e["butanal"]["concentration"])
  this.number++

  console.log("the reaction duration is now:", this.reactionDuration)

  if (this.number < 100) {
    this.startTimerTests()
  }
  else if (this.number >= 100) {
    console.log("system has finished")
  }
  this.timer_automated_measurement = false

  let values = this.user.getValue()
  let value1 = values.data[0]
  console.log("value1", value1)
  let xarray = value1.x

  console.log("xarray", xarray)
  let last_entry = xarray[xarray.length - 1]
  xarray.push(last_entry + 1)

  let yarray = value1.y

  yarray.push(e["butanal"]["concentration"])

  let update = {
    data: [
      { x: xarray, y: yarray, type: 'scatter', name: "data1" },
    ],
    layout: { title: 'Reaction flow' }
  }
  Plotly.update('pagegraph', this.data.data, this.data.layout)

  console.log(this.number)

  console.log("reaction time is", this.reactionDuration)
  this.setTime()

})
})
}

addNumber() {


let values = this.user.getValue()
let value1 = values.data[0]
console.log("value1", value1)
let xarray = value1.x

console.log("xarray", xarray)
let last_entry = xarray[xarray.length - 1]

xarray.push(last_entry + 1)
console.log("new x array", xarray)


let yarray = value1.y

yarray.push(last_entry * 2)
console.log("new y array", yarray)
let update =
{
data: [
  { x: xarray, y: yarray, type: 'scatter', name: "data1" },
],
layout: { title: 'Reaction flow' }
}
this.user.next(update)
Plotly.update('pagegraph', this.data.data, this.data.layout)

console.log("data object is:", this.data)

}
*/









  //}}

}