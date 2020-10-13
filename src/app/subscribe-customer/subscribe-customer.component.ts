import { Component, OnInit } from '@angular/core';
import { Customer } from '../Models/customer';
import { FormBuilder, Validators } from '@angular/forms';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular';
import { HomeBehaviorService } from '../services/home-behavior.service';

@Component({
  selector: 'ns-subscribe-customer',
  templateUrl: './subscribe-customer.component.html',
  styleUrls: ['./subscribe-customer.component.css']
})
export class SubscribeCustomerComponent implements OnInit {
  public customer: Customer;
  public customerForm: any;
  public tabSelectedIndex = 0;
  public registerButtonText = "Proxima pagina!";
  constructor(
    private fb: FormBuilder,
    private routerEx: RouterExtensions,
    private homeBehave: HomeBehaviorService
  ) { }

  ngOnInit() {
    this.formUserBuilder(); 
  }

  dontRegister(): void {
    console.log("Event cliqued");
    this.homeBehave.setUserHasAvoidedCustomerForm(true);
    this.routerEx.navigate(["home"]);
  }

  signUpUserInfo(){
    if (this.tabSelectedIndex == 0) {
      this.tabSelectedIndex = 1;
      this.registerButtonText = "Registrar minhas informações!";
    } else if (this.tabSelectedIndex == 1) {
      // Send to AWS;
      console.log("Start sending...");
    }
  }

  private formUserBuilder(): void {
    this.customerForm = this.fb.group({
      birthdate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      personal_number: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(8)]],
      address: this.fb.group({
        city: [null, [Validators.required]],
        country: [null, [Validators.required]],
        lat: [null, [Validators.required]],
        lon: [null, [Validators.required]],
        state: [null, [Validators.required]],
        street: [null, [Validators.required]],
        zip_code: [null, [Validators.required]],
      })
    });
  }
}
