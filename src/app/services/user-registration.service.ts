import { Injectable } from '@angular/core';
import { CognitoCallback, CognitoService, RegistrationUser } from "./cognito.service";

import { CognitoUserAttribute } from "amazon-cognito-identity-js/dist/amazon-cognito-identity";

declare let AWS: any;
// declare let AWSCognito: any;

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(public cUtil: CognitoService) {
  }

  register(user: RegistrationUser, callback: CognitoCallback): void {
    console.log("user: " + JSON.stringify(user));

    let attributeList = [];

    let dataEmail = {
      Name: 'email',
      Value: user.email
    };
    let dataName = {
      Name: 'name',
      Value: user.name
    };
    let dataNickname = {
      Name: 'nickname',
      Value: user.nickname
    };
    attributeList.push(new CognitoUserAttribute(dataEmail));
    attributeList.push(new CognitoUserAttribute(dataName));
    attributeList.push(new CognitoUserAttribute(dataNickname));

    this.cUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        console.log("registered user: " + result);
        callback.cognitoCallback(null, result);
      }
    });

  }

  // confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

  //   let userData = {
  //     Username: username,
  //     Pool: this.cUtil.getUserPool()
  //   };

  //   let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  //   cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
  //     if (err) {
  //       callback.cognitoCallback(err.message, null);
  //     } else {
  //       callback.cognitoCallback(null, result);
  //     }
  //   });
  // }

  // resendCode(username: string, callback: CognitoCallback): void {
  //   let userData = {
  //     Username: username,
  //     Pool: this.cUtil.getUserPool()
  //   };

  //   let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  //   cognitoUser.resendConfirmationCode(function (err, result) {
  //     if (err) {
  //       callback.cognitoCallback(err.message, null);
  //     } else {
  //       callback.cognitoCallback(null, result);
  //     }
  //   });
  // }
}
