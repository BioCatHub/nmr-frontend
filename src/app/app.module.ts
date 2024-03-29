import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { AutomatedSystemComponent } from './automated-system/automated-system.component'
//import { CdsModule } from '@cds/angular';
//import { ClarityIcons, userIcon } from '@cds/core/icon';

import {ReactiveFormsModule} from "@angular/forms"
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VisualisationComponent,
    CalibrationComponent,
    AutomatedSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    //CdsModule,
    //ClarityIcons,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    PlotlyModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
