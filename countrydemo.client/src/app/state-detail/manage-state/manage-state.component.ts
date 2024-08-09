import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrl: './manage-state.component.css'
})
export class ManageStateComponent {
  stateForm: FormGroup;
  isEdit = false;
  countries: Country[] = [];
  
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadCountries();
    this.stateForm = this.fb.group({
      stateId: [0],
      name: ['',[Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(1)]],
      countryId: [0],
      countryName: ['']
    });
  }

  ngOnInit() {
    debugger
    const id:any = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.countryService.getState(id).subscribe(data => {
        this.stateForm.patchValue(data);
      });
    }
  }
  get f(): { [key: string]: any } {
    return this.stateForm.controls;
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

  onSubmit() {
    debugger
    this.submitted = true;
    if (this.stateForm.invalid) {
      return;
    }
    else{
      const stateData = this.stateForm.value;
      if (this.isEdit) {
        // Assuming your API expects the ID in the payload
        this.countryService.updateState({ ...stateData}).subscribe(() => {
          this.router.navigate(['/states']);
        });
      } else {
        this.countryService.addState(stateData).subscribe(() => {
          this.router.navigate(['/states']);
        });
      }
    }
  }
}
