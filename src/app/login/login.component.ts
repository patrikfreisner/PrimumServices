import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import * as utilsModule from "tns-core-modules/utils/utils";
import { alert } from "tns-core-modules/ui/dialogs";

import { CognitoCallback, LoggedInCallback, CognitoService, LoginUser } from "../services/cognito.service";
import { UserLoginService } from "../services/user-login.service";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallback, OnInit, LoggedInCallback {
  cognito: any;
  loginUser: LoginUser;
  userLogged: any;
  isBusy: boolean;

  constructor(
    private routerExtensions: RouterExtensions,
    public userLoginService: UserLoginService,
    private cUtil: CognitoService,
  ) {
    this.loginUser = new LoginUser();
  }

  ngOnInit() {
    this.isBusy = false;
  }

  onLogin() {
    this.isBusy = true;
    let options = {
      title: "Hey!!! :|",
      message: "É obrigatorio informar email e senha!",
      okButtonText: "OK"
    };

    if ((this.loginUser.email != '' && this.loginUser.email != null) && (this.loginUser.password != '' && this.loginUser.password != null)) {
      this.userLoginService.authenticate(this.loginUser.email, this.loginUser.password, this);
    } else {
      alert(options);
      this.isBusy = false;
    }
  }

  goToPrimumWebPage() {
    utilsModule.openUrl("http://www.primumtec.com");
  }

  goToRegistration() {
    this.routerExtensions.navigate(["/registration"]);
  }

  sendLogin() {
    this.routerExtensions.navigate(["/home"]);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      console.log("Ops, algo de errado ocorreu! " + message)
      if (message == "Incorrect username or password.") {
        let options = {
          title: "Ops...",
          message: "Usuário ou senha incorretos!",
          okButtonText: "OK"
        };
        alert(options);
      }
      this.isBusy = false;
    } else { //success
      // console.log("in callback...result: " + result);
      // console.log(result);
      this.userLogged = this.cognitoCustomAttrToJson(result.idToken.payload);
      this.isBusy = false;
      this.sendLogin();
    }
  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.userLogged = this.cognitoCustomAttrToJson(this.cUtil.getUserData());
      this.sendLogin();
    }
  }

  cognitoCustomAttrToJson(payload) {
    var jsonData = JSON.stringify(payload);
    jsonData = jsonData.replace(new RegExp('custom:', 'g'), '');
    return JSON.parse(jsonData);
  }
}
