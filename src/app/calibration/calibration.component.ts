import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'
import { timer, Observable } from "rxjs"
import { BehaviorSubject } from 'rxjs'
import { VisualisationComponent } from "../visualisation/visualisation.component"
import { ControlCommandsService } from "../shared/control-commands.service"
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css']
})
export class CalibrationComponent implements OnInit {


concentrations: Object
Substances = ["reference","butanal", "PAC"]
compounds = []




  constructor(private ot:OtInterfaceService) { }

  ngOnInit(): void {
  }

  checkMeasurement(){
    this.ot.startMeasurement().subscribe((e)=>{
      console.log(e)
      console.log("butanal ist", e.butanal)
      let concentrations = this.buildConcentrationList(e)    
      this.compounds = concentrations

      console.log("die konzentrationen sind", this.compounds)
      
    })
  }

  buildConcentrationList(payload){
    let emptyList = []
    console.log("länge",this.compounds.length)
    console.log(this.compounds.length)
    for (let s of this.Substances){
      console.log(payload[s])
      let obj = {
        name:s,
        concentration:payload[s]["concentration"],
        value:payload[s]["value"]
      }
    emptyList.push(obj)
    }

    return emptyList
    


  }

}
