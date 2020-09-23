import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../services/user-registration.service';
import { CognitoCallback } from "../services/cognito.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular';

import { confirm } from "tns-core-modules/ui/dialogs";
import { Subject } from 'rxjs';

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements CognitoCallback, OnInit {
  userLogged: any;
  submitted: boolean;
  userform: FormGroup;
  constructor(
    public userRegistration: UserRegistrationService,
    private fb: FormBuilder,
    public router: RouterExtensions
  ) {
    this.formUserBuilder();
  }

  ngOnInit() {
    this.submitted = false;

  }

  signUpUser() {
    this.submitted = true;
    this.userLogged = this.userform.value;
    this.userRegistration.register(this.userLogged, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      let options = {
        message: "Já existe um usuário cadastrado com esse e-mail!\nDesejar fazer login?",
        cancelButtonText: "Não",
        okButtonText: "Sim!"
      };
      if (message = "An account with the given email already exists.") {
        confirm(options).then((result: boolean) => {
          if (result) {
            this.router.navigate(["/login"]);
          }
        });
      }
    } else { //success
      alert("Registro iniciado! \nConfirmação de email encaminhada para " + result.codeDeliveryDetails.Destination);
      this.formUserBuilder();
      this.router.navigate(["/login"]);
    }
    this.submitted = false;
  }

  cognitoCustomAttrToJson(payload) {
    var jsonData = JSON.stringify(payload);
    jsonData = jsonData.replace(new RegExp('custom:', 'g'), '');
    return JSON.parse(jsonData);
  }

  private formUserBuilder(): void {
    this.userform = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmpassword: [null, [Validators.required, Validators.minLength(8)]],
    }, { validator: this.passwordValidator });
  }

  public passwordValidator(form: FormGroup): void {
    if (form.get('password').value === form.get('confirmpassword').value && !form.get('confirmpassword').errors) {
      form.get('confirmpassword').setErrors(null);
    } else {
      form.get('confirmpassword').setErrors({ 'mismatch': true });
    }
  }

}
