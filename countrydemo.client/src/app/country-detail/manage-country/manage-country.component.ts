import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-country',
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.css'
})
export class ManageCountryComponent {
  countryForm: FormGroup;
  isEdit = false;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.countryForm = this.fb.group({
      countryId: [0],
      name: ['',[Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    const id:any = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.countryService.getCountry(id).subscribe(data => {
        this.countryForm.patchValue(data);
      });
    }
  }
  get f(): { [key: string]: any } {
    return this.countryForm.controls;
  }

  onSubmit() {
    debugger
    debugger
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    } 
    else{
      const countryData = this.countryForm.value;
      if (this.isEdit) {
        // Assuming your API expects the ID in the payload
        this.countryService.updateCountry({ ...countryData}).subscribe(() => {
          this.router.navigate(['/countries']);
        });
      } else {
        this.countryService.addCountry(countryData).subscribe(() => {
          this.router.navigate(['/countries']);
        });
      }
    }
  }
}
