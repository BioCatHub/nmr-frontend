import { Injectable } from '@angular/core';
import bch_json from "../../assets/biocathub.json";

@Injectable({
  providedIn: 'root'
})
export class BiocathubSubmissionService {

  constructor() { }

mapData(data){
  console.log(bch_json["condition"])
  console.log(data["data"])
  let BA_replicates = this.build_replicates(data["data"][0])
  let PAC_replicates = this.build_replicates(data["data"][1])

  let BA_measurement = this.build_measurement(BA_replicates, "3-OH-benzaldehyde")
  let PAC_measurement = this.build_measurement(PAC_replicates,"3-OH-phenylacetylcarbinol" ) 

  let measurements = {measurements:[BA_measurement, PAC_measurement]}

  let data_model = bch_json
  data_model["experimentalData"] = measurements
  return data_model

}

build_replicates(BA_data){
  console.log(BA_data)
  let x_values = BA_data["x"]
  let y_values = BA_data["y"]
  let length = x_values.length
  let replicates = []

  for(let i = 0; i <length; i++){
    let replicate = {}
    replicate["x_value"] = x_values[i]
    let y_value = [y_values[i]]
    replicate["y_values"] = y_value
    replicates.push(replicate)
  }

  return replicates

}

build_measurement(replicates, reagent){
  let measurement ={
    x_unit:"min",
    x_name:"time in minutes",
    y_unit:"mmol/L",
    y_name:"concentration in mmol/L",
    plotStyle: "point",
    reagent:reagent,
    notes:"concentration measurement",
    replicates: replicates

  } 
  return measurement
}


}
