import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { action, alert } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from 'nativescript-angular';
import { HomeBehaviorService } from '../services/home-behavior.service';
import { CognitoService } from '../services/cognito.service';

import { Page } from 'tns-core-modules/ui/page';
import { LocationService } from '../services/location.service';
import { TabView } from 'tns-core-modules/ui/tab-view';
import { AWSService } from '../services/AWS_API/aws.service';
import { Customer } from '../Models/customer';
import { HomeComponent } from '../home/home.component';
import { UserRegistrationService } from '../services/user-registration.service';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'ns-subscribe-customer',
  templateUrl: './subscribe-customer.component.html',
  styleUrls: ['./subscribe-customer.component.css']
})
export class SubscribeCustomerComponent implements OnInit {

  locationDataState: any[];
  locationStateCity: any[];
  cityChoice: string;
  editableOn: boolean;

  public currentCustomer: any;
  public customerForm: any;
  public tabSelectedIndex: number;
  public registerButtonText = "Proxima pagina!";
  private genders: string[];


  constructor(
    private fb: FormBuilder,
    private userdata: CognitoService,
    private routerEx: RouterExtensions,
    private homeBehave: HomeBehaviorService,
    private apiLocation: LocationService,
    private userLoginService: UserLoginService,
    private awsApi: AWSService
  ) {
    this.editableOn = false;
    this.tabSelectedIndex = 0;
  }

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
      this.customerForm.patchValue({ gender: result });
    });
  }

  getCepValues(): void {
    var cep = this.customerForm.get("address.zip_code").value;
    if (cep != null && cep != "") {
      cep = cep.replace("-", "");
      if (cep.length >= 8) {
        var valueToChange = cep.substring(0, 5) + "-" + cep.substring(5, 8)
        this.customerForm.patchValue({ address: { zip_code: valueToChange } });
        this.apiLocation.getCepInfo(cep).subscribe(
          (cep) => {
            if (cep.erro != true) {
              this.customerForm.patchValue({
                address: {
                  country: "Brasil",
                  city: cep.localidade,
                  state: cep.uf,
                  neighborhood: cep.bairro,
                  street: cep.logradouro
                }
              });
            } else {
              alert("Não conseguimos pegar suas informações pelo CEP por favor digite!!!")
              this.editableOn = true;
            }
          },
          (erro) => {
            alert("Não conseguimos pegar suas informações pelo CEP por favor digite!!!")
            this.editableOn = true;
          }
        );
      }
    }
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
    } else if (this.tabSelectedIndex == 1 && (
      this.customerForm.get("address.city").valid &&
      this.customerForm.get("address.country").valid && this.customerForm.get("address.state").valid &&
      this.customerForm.get("address.street").valid && this.customerForm.get("address.zip_code").valid
    )) {
      // Send to AWS;
      console.log("Start sending...");
      this.awsApi.createNewCustomer(<Customer>this.customerForm.value).subscribe(
        (success) => {
          console.log(success);
          this.routerEx.navigate(['home'], { clearHistory: true });
          // alert("Muito obrigado!\nAgora está tudo certinho! :)");
          this.homeBehave.setUserHasAvoidedCustomerForm(true);
          alert("Precisavos que você faça login novamente para atualizar seus dados!\nObrigado!");
          this.userLoginService.logout();
          this.routerEx.navigate(["/login"], { clearHistory: true });
        },
        (error) => {
          alert("Ops... Houve um erro, tente novamente mais tarde. :( ");
          console.log(error);
        }
      );
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
        neighborhood: [null, [Validators.required]],
        zip_code: [null, [Validators.required, Validators.minLength(9)]],
      })
    });
  }

  private onSelectedIndexchanged(event: number) {
    if (event == 1) {
      this.registerButtonText = "Registrar minhas informações!";
      this.tabSelectedIndex = 1;
      this.signUpUserInfo();
    } else {
      this.registerButtonText = "Proxima pagina!";
      this.tabSelectedIndex = 0;
    }
  }
}
