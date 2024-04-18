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
     { x: [ 8.82365, 18.76525, 56.724, 94.93486666666666, 132.88901666666666, 170.85535], y: [12.144897283808954, 11.714074069699333, 6.25730431844186, 7.064673939788032, 5.9859489030214235, 2.6960464296340483], type: 'scatter', name: "3-OH-benzaldehyde" },
     { x: [8.82365, 18.76525, 56.724, 94.93486666666666, 132.88901666666666, 170.85535], y: [ 0.607903866392912, 0.5151924492556964, 3.699283591315337, 5.058921282478785, 6.180616578526451, 7.462971287080487], type: 'scatter', name: "Phenylacetylcarbinol" }
    ],
    layout: { title: 'Reaction progress curve' }
  };

// variables needed for describing the cascade status
  Inactivation: boolean = false
  stop_flow_stauts: boolean = false
  timer_status: boolean = false
  timer_automated_measurement: boolean = false
  loop = true
  pump2
  enzymeAdded = false
  cascade_not_started = true
  loading
// variables needed during the cascade process
  myForm: FormGroup;
  time = new Date()
  #reactionDuration = 12000
  reactionDuration = 36000
                           

  number = 0
  timeOfFirstMeasurement: Date
  timeActualMeasurment: Date
  pumpTimeReaction2 = 20
  input = 3
//Objects needed to descide the progress
  Molecules
  //Boundaries are right now handled by the backend. Implmentation intended for future features.
  boundaries = { butanal: 3, PAC:3 }

  


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

    // Start the cascade

    console.log("Die nummer ist", this.number)
    console.log("Cascade has started")
    this.cascade_not_started = false

    // defies the T0 value, which will be the reference to calculate in 
    // the later process the time differences between measurements

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
            // Iactivation is removed for test purposes from this setup
            this.Inactivation = false
            this.pump2 = true
            this.ot.startReaction2(this.myForm.value).subscribe((e) => {
              console.log("reaction 2 has started")
              //this.startTimerTests()
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
