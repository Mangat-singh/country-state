import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { ManageCountryComponent } from './country-detail/manage-country/manage-country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateDetailComponent } from './state-detail/state-detail.component';
import { ManageStateComponent } from './state-detail/manage-state/manage-state.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailComponent,
    ManageCountryComponent,
    StateDetailComponent,
    ManageStateComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
