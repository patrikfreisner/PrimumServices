import { Component, OnInit } from '@angular/core';
import { Customer } from '../Models/customer';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ns-subscribe-customer',
  templateUrl: './subscribe-customer.component.html',
  styleUrls: ['./subscribe-customer.component.css']
})
export class SubscribeCustomerComponent implements OnInit {
  public customer: Customer;
  public customerForm: any;
  constructor(
    private fb: FormBuilder
  ) {
    this.customerForm = new Customer();
  }

  ngOnInit() {
  }

  private formUserBuilder(): void {
    this.customerForm = this.fb.group({
      birthdate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      personal_number: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(8)]],
      address: {
        city: [null, [Validators.required]],
        country: [null, [Validators.required]],
        lat: [null, [Validators.required]],
        lon: [null, [Validators.required]],
        state: [null, [Validators.required]],
        street: [null, [Validators.required]],
        zip_code: [null, [Validators.required]],
      }
    });
  }
}
