import { Component, OnInit } from '@angular/core';
import { Customer } from '../Models/customer';
import { FormBuilder, Validators } from '@angular/forms';
import { action } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from 'nativescript-angular';
import { HomeBehaviorService } from '../services/home-behavior.service';
import { CognitoService } from '../services/cognito.service';

@Component({
  selector: 'ns-subscribe-customer',
  templateUrl: './subscribe-customer.component.html',
  styleUrls: ['./subscribe-customer.component.css']
})
export class SubscribeCustomerComponent implements OnInit {
  public currentCustomer: any;
  public customerForm: any;
  public tabSelectedIndex = 0;
  public registerButtonText = "Proxima pagina!";
  private genders: string[];
  constructor(
    private fb: FormBuilder,
    private userdata: CognitoService,
    private routerEx: RouterExtensions,
    private homeBehave: HomeBehaviorService
  ) { }

  ngOnInit() {
    this.genders = ['Masculino', 'Feminino', 'Outros'];
    this.formUserBuilder();
    this.currentCustomer = this.userdata.getUserData();
  }

  genderPicker(): void {
    let options = {
      message: "Escolha uma das opções abaixo:",
      cancelButtonText: "Cancelar",
      actions: this.genders
    };

    action(options).then((result) => {
      this.customerForm.patchValue({gender: result});
    });
  }

  dontRegister(): void {
    console.log("Event cliqued");
    this.homeBehave.setUserHasAvoidedCustomerForm(true);
    this.routerEx.navigate(["home"]);
  }

  signUpUserInfo() {
    if (this.tabSelectedIndex == 0 && (this.customerForm.get("birthdate").valid &&
      this.customerForm.get("gender").valid && this.customerForm.get("personal_number").valid &&
      this.customerForm.get("phone").valid)) {
      this.tabSelectedIndex = 1;
      this.registerButtonText = "Registrar minhas informações!";
    } else if (this.tabSelectedIndex == 1) {
      // Send to AWS;
      console.log("Start sending...");
      console.log(this.customerForm.value);
    } else if (!this.customerForm.get("birthdate").valid ||
      !this.customerForm.get("gender").valid || !this.customerForm.get("personal_number").valid ||
      !this.customerForm.get("phone").valid) {
      alert("Ops... Um ou mais campos não estão preenchidos corretamente!");
    }
  }

  private formUserBuilder(): void {
    this.customerForm = this.fb.group({
      birthdate: [null, [Validators.required, Validators.minLength(10)]],
      gender: [null, [Validators.required]],
      personal_number: [null, [Validators.required, Validators.minLength(14)]],
      phone: [null, [Validators.required, Validators.minLength(14)]],
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

  private onSelectedIndexchanged(event) {
    this.tabSelectedIndex = event;
    if (event == 0) {
      this.registerButtonText = "Proxima pagina!";
    } else {
      this.signUpUserInfo();
    }
  }
}
