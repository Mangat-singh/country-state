import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, State } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private BaseUrl = 'https://localhost:7032/api/'; // Adjust the URL as needed
  private getCountryUrl = 'country/GetCountries';
  private getCountrybyIdUrl = 'country/GetCountry';
  private addCountryUrl = 'country/AddCountry';
  private updateCountryUrl = 'country/UpdateCountry';
  private deleteCountryUrl = 'country/DeleteCountry';

  private getStatesUrl = 'country/GetStates';
  private getStateUrl = 'country/GetState';
  private addStateUrl = 'country/AddState';
  private updateStateUrl = 'country/updateState';
  private deleteStateUrl = 'country/DeleteState';


  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    var res=this.http.get<Country[]|any>(this.BaseUrl+this.getCountryUrl);
    return res;
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.BaseUrl+this.getCountrybyIdUrl}/${id}`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.BaseUrl+this.addCountryUrl, country);
  }

  updateCountry(country: Country): Observable<void> {
    return this.http.put<void>(`${this.BaseUrl+this.updateCountryUrl}/${country.countryId}`, country);
  }

  deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl+this.deleteCountryUrl}/${id}`);
  }

  getStates(): Observable<State[]> {
    var res=this.http.get<State[]|any>(this.BaseUrl+this.getStatesUrl);
    return res;
  }
  getState(id: number): Observable<State> {
    return this.http.get<State>(`${this.BaseUrl+this.getStateUrl}/${id}`);
  }
  
  addState(state: State): Observable<State> {
    return this.http.post<State>(this.BaseUrl+this.addStateUrl, state);
  }

  updateState(state: State): Observable<void> {
    return this.http.put<void>(`${this.BaseUrl+this.updateStateUrl}/${state.stateId}`, state);
  }
  deleteState(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl+this.deleteStateUrl}/${id}`);
  }

}
