import { Component, OnInit } from '@angular/core';
import { OtInterfaceService } from '../shared/ot-interface.service'

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

  stopFlow() {
    this.stop_flow_stauts = true

    this.ot.stopFlow().subscribe((e) => {
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

}
