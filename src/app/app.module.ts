import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DashboardComponent} from "@app/dashboard/dashboard.component";
import {FormsModule} from "@angular/forms";
import {PhotoService} from "@app/photos/photo.service";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "@app/app.routing.module";
import {BackComponent} from "@app/dashboard/dashboard-back/back.component";
import {SpinnerComponent} from "@app/util/spinner/spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BackComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
