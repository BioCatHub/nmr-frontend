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
import { VisualisationComponent } from './visualisation/visualisation.component'
//import { CdsModule } from '@cds/angular';
//import { ClarityIcons, userIcon } from '@cds/core/icon';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VisualisationComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
