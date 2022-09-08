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
    console.log("request ist", update)
    let xarray = data.data[0]["x"]
    let last_entry = xarray[xarray.length - 1]
    let time = this.getTimeDifference(initialTime)
    xarray.push(time)
    let xarray_PAC = data.data[1]["x"]
    xarray_PAC.push(time)

    let y_benzaldehyde = data.data[0]["y"]
    let y_PAC = data.data[1]["y"]
    y_benzaldehyde.push(2)
    y_PAC.push(3)

    let updated = {
      data: [
        { x: xarray, y: y_benzaldehyde, type: 'scatter', name: "3-OH-benzaldehyde" },
        { x: xarray_PAC, y: y_PAC, type: 'scatter', name: "3-OH-benzaldehyde" },
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
      },
      PAC:{
        latest_concentration:0,
        status:"not-started"
      },
    }
    return molecules
  }
  updateMolecules(concentrations, Molecules, boundaries){
    console.log(Molecules)
      console.log("concentrations are",concentrations["butanal"]["concentration"])
      Molecules["butanal"]["latest_concentration"] = concentrations["butanal"]["concentration"]
      Molecules["PAC"]["latest_concentration"] = concentrations["PAC"]["concentration"]
      return Molecules
  }
  caseDecision(number, molecules, boundaries){

    let butanal_status = molecules["butanal"]["status"]
    let butanal_conc = molecules["butanal"]["latest_concentration"]
    let PAC_status = molecules["PAC"]["status"]
    let PAC_conc = molecules["PAC"]["latest_concentration"]
    //let metaraminol_status = molecules["metaraminol"]["status"]
    //let metaraminol_coc = molecules["metaraminol"]["concentration"]


    if (number >= 100) {
      console.log("system has finished")
      return {status:"stop", content:molecules}
    }
    else if (butanal_status == "not-started") {
      molecules["butanal"]["status"] = "started"
      return {status:"continue", content:molecules}
      
    }
    else if (butanal_status === "started" && butanal_conc <= boundaries["butanal"]) {
      molecules["butanal"]["status"] = "finished"
      molecules["PAC"]["status"] = "started"
      return {status:"cascade_step_1_finished", content:molecules}
    }
    else if (PAC_status === "started" && PAC_conc <= boundaries["PAC"]) {
      console.log("boundaries PAC", boundaries["PAC"])
      molecules["PAC"]["status"] = "finished"
      return {status:"cascade_step_2_finished", content:molecules}
    }
    else {
      console.log("no case hits here")
      console.log("Die Moleküle sind im else case",molecules, butanal_status, butanal_conc, PAC_status, PAC_conc)
      return {status:"continue", content:molecules}
    }
  }
}
