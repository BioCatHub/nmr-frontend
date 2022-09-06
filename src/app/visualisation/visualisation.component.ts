import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs'
import { concatMap } from 'rxjs/operators';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';


@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css'],
})
export class VisualisationComponent implements OnInit {

  public data = {
    data: [
      { x: [1,2], y: [1,2], type: 'scatter', name:"data1"},
    ],
    layout: {title: 'Reaction flow'}
  };


  user = new BehaviorSubject(this.data);


  xValues = [1,2,3,4]
  yValuesButanal = [1, 4, 9, 4]
  yValuesPAC = [1, 3, 6, 9]

  graph2 = {
    data: [
      { x: this.xValues, y: this.yValuesButanal, type: 'scatter', name:"data1"},
    ],
    layout: {title: 'Reaction flow'}
  };


  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("ALIVEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

    Plotly.newPlot('pagegraph', this.data.data, this.data.layout)
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
