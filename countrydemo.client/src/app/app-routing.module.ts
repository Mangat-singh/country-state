import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { ManageCountryComponent } from './country-detail/manage-country/manage-country.component';
import { StateDetailComponent } from './state-detail/state-detail.component';
import { ManageStateComponent } from './state-detail/manage-state/manage-state.component';

const routes: Routes = [
  { path: 'countries', component: CountryDetailComponent },
  { path: 'country', component: ManageCountryComponent },
  { path: 'country/:id', component: ManageCountryComponent },

  { path: 'states', component: StateDetailComponent },
  { path: 'state', component: ManageStateComponent },
  { path: 'state/:id', component: ManageStateComponent },
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
