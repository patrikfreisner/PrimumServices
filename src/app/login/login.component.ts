import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import * as utilsModule from "tns-core-modules/utils/utils";
import { alert } from "tns-core-modules/ui/dialogs";
import { confirm } from "tns-core-modules/ui/dialogs";

import { CognitoCallback, LoggedInCallback, CognitoService, LoginUser } from "../services/cognito.service";
import { UserLoginService } from "../services/user-login.service";
import { UserRegistrationService } from '../services/user-registration.service';
import { AWSService } from '../services/AWS_API/aws.service';

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
    public userRegistration: UserRegistrationService,
    private cUtil: CognitoService
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

  goTo(urlToGo) {
    utilsModule.openUrl(urlToGo);
  }

  goToLocal(urlToGo) {
    this.routerExtensions.navigate([urlToGo]);
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
      } else if (message == "User is not confirmed.") {
        let options = {
          message: "Você ainda não confirmou seu email!\nEnviar e-mail de confirmação novamente?",
          okButtonText: "Sim!",
          cancelButtonText: "Não, obrigado."
        };
        confirm(options).then((result: boolean) => {
          if (result) {
            this.userRegistration.resendCode(this.loginUser.email, this);
          }
        });
      } else {
        let options = {
          title: "Ops! :(",
          message: "Um erro inesperado ocorreu!!!\nTente mais tarde, caso o erro ocorra com certa frequencia contate o adminstrador do sistema!",
          okButtonText: "OK"
        };
        alert(options);
      }

      this.isBusy = false;
    } else {
      this.userLogged = result.idToken.payload;
      this.isBusy = false;
      this.goToLocal('/home');
    }
  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.userLogged = this.cUtil.getUserData();
      this.goToLocal('/home');
    }
  }
}
