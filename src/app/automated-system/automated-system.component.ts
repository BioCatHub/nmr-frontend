import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'
import { timer, Observable } from "rxjs"
import { BehaviorSubject } from 'rxjs'
import { VisualisationComponent } from "../visualisation/visualisation.component"
import { ControlCommandsService } from "../shared/control-commands.service"
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-automated-system',
  templateUrl: './automated-system.component.html',
  styleUrls: ['./automated-system.component.css']
})
export class AutomatedSystemComponent implements OnInit {

  constructor(private ot: OtInterfaceService,
    private comp: VisualisationComponent,
    private Cc: ControlCommandsService,
    private fb: FormBuilder) { }

  data = {
    data: [
     { x: [15.753033333333333, 31.518083333333333, 75.27738333333333, 119.04028333333333, 162.80608333333333], y: [20.471119197357112, 45.33744537561042, 19.52605436101166, 20.566362638097893, 19.089837148457054], type: 'scatter', name: "3-OH-benzaldehyde" },
     { x: [], y: [], type: 'scatter', name: "Phenylacetylcarbinol" }
    ],
    layout: { title: 'Reaction flow' }
  };

// variables needed for describing the cascade status
  Inactivation: boolean = false
  stop_flow_stauts: boolean = false
  timer_status: boolean = false
  timer_automated_measurement: boolean = false
  loop = true
  pump2
  enzymeAdded = false
  loading
// variables needed during the cascade process
  myForm: FormGroup;
  time = new Date()
  reactionDuration = 120000
  number = 0
  timeOfFirstMeasurement: Date
  timeActualMeasurment: Date
  pumpTimeReaction2 = 20
  input = 3
//Objects needed to descide the progress
  Molecules
  boundaries = { butanal: 3, PAC:17 }

  


  ngOnInit(): void {
    Plotly.newPlot('pagegraph', this.data.data, this.data.layout)
    this.Molecules = this.Cc.instanciateMolecules("placeholder")
    this.myForm = this.fb.group({
      pump1:"",
      pump2:""
    })
    }

    printForm(){
      let value = this.myForm.controls["pump1"].value
      console.log(value)
      console.log(this.myForm.value)

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
        this.data = data
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
        console.log("molecule Update",moleculeUpdate)
        let status = moleculeUpdate["status"]

        if (status == "finished"){
          console.log("Process has finished")
        }
        else if(status=="continue"){
          this.Molecules = moleculeUpdate["content"]
          this.startTimerTests()
        }

        else if(status == "cascade_step_1_finished"){            
          this.Molecules = moleculeUpdate["content"]
          this.Inactivation = true
          this.ot.inactiveReaction().subscribe((e) => {
            this.Inactivation = false
            this.pump2 = true
            this.ot.startReaction2(this.myForm.value).subscribe((e) => {
              console.log("reaction 2 has started")
              this.startTimerTests()
              })
            })
          }

          else if (status == "cascade_step_2_finished"){
            this.Molecules = moleculeUpdate["content"]
            this.Inactivation = true
            this.ot.inactiveReaction().subscribe((e) => {
              this.Inactivation = false
              alert("Cascade is finished")
              })

          }
      })
      })


    }

}
