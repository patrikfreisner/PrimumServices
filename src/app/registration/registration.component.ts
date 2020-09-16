import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../services/user-registration.service';
import { CognitoCallback, RegistrationUser } from "../services/cognito.service";

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements CognitoCallback, OnInit {
  userLogged: any;
  registrationUser: RegistrationUser;
  constructor(
    public userRegistration: UserRegistrationService,
  ) {
    this.registrationUser = new RegistrationUser();
  }

  ngOnInit() {
  }

  onRegister() {
    console.log(this.registrationUser);
    if (this.registrationUser.password == this.registrationUser.confirmpassword) {
      this.userRegistration.register(this.registrationUser, this);
    } else {
      alert("As senhas não são identicas!!!");
    };
    //this.nav.setRoot(HomePage);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      console.log("Ops, algo de errado ocorreu! " + message)
    } else { //success
      console.log("in callback...result: " + result);
      console.log(result);
      // this.userLogged = this.cognitoCustomAttrToJson(result.idToken.payload);
      alert("Registro iniciado! \nConfirmação de email encaminhada para " + result.codeDeliveryDetails.Destination);
    }
  }

  cognitoCustomAttrToJson(payload) {
    var jsonData = JSON.stringify(payload);
    jsonData = jsonData.replace(new RegExp('custom:', 'g'), '');
    return JSON.parse(jsonData);
  }

}
