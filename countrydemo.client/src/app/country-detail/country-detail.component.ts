import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent {
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      data => {
      this.countries = data;
    },
      error => {
        console.error('Error loading data', error);
      }
  );
  }
  deleteCountry(id: number): void {
    this.countryService.deleteCountry(id).subscribe(() => {
      this.loadCountries();
    });
  }
}
