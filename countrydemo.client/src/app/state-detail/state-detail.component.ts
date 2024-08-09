import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { State } from '../../models/country';

@Component({
  selector: 'app-state-detail',
  templateUrl: './state-detail.component.html',
  styleUrl: './state-detail.component.css'
})
export class StateDetailComponent {
  states: State[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getStates().subscribe(
      data => {
      this.states = data;
    },
      error => {
        console.error('Error loading data', error);
      }
  );
  }
  deleteState(id: number): void {
    this.countryService.deleteState(id).subscribe(() => {
      this.loadCountries();
    });
  }
}
