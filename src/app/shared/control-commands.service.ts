import { Injectable } from '@angular/core';
import { OtInterfaceService } from './ot-interface.service'

@Injectable({
  providedIn: 'root'
})
export class ControlCommandsService {

  constructor(private ot: OtInterfaceService) { }

  setReactionDuration(EnzymeStatus) {
    if (EnzymeStatus == true) {
      return 1800000
    }
    else if (!EnzymeStatus) {
      return 10000
    }
  }

  updateMeasurmentData(data, update, initialTime) {
    console.log(initialTime)
    console.log("request ist", update)
    let xarray = data.data[0]["x"]
    let last_entry = xarray[xarray.length - 1]
    let time = this.getTimeDifference(initialTime)
    xarray.push(time)

    let yarray = data.data[0]["y"]
    yarray.push(2)

    let updated = {
      data: [
        { x: xarray, y: yarray, type: 'scatter', name: "data1" },
      ],
      layout: { title: 'Reaction flow' }
    }
    return updated
  }

  getTimeDifference(T0) {
    let actualTime = new Date()
    let timeDifference = actualTime.getTime() - T0.getTime()
    console.log("time Difference", timeDifference / 60000)
    return timeDifference / 60000

  }

  instanciateMolecules(boundaries){

    let molecules = {
      butanal:{
        latest_concentration:0,
        status:"not-started"
      }
    }
    return molecules
  }
  updateMolecules(concentrations, Molecules, boundaries){
      console.log("concentrations are",concentrations["butanal"]["concentration"])
      Molecules["butanal"]["latest_concentration"] = concentrations["butanal"]["concentration"]
      if (Molecules["butanal"]["latest_concentration"] <= boundaries["butanal"]){
        Molecules["butanal"]["status"] = "finished"
      }
      return Molecules

  }



}
