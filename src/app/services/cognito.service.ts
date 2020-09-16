import { Injectable } from '@angular/core';
import { _POOL_DATA } from "./properties.service";

import { CognitoUserPool } from "amazon-cognito-identity-js/dist/amazon-cognito-identity";
import { AWS } from "amazon-cognito-identity-js/lib";

// declare let AWS: any;
// declare let AWSCognito: any;

export class RegistrationUser {
  name: string;
  email: string;
  password: string;
  nickname: string;
  confirmpassword: string;
}

export class LoginUser {
  email: string;
  password: string;
}

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
  isLoggedInCallback(message: string, loggedIn: boolean): void;
}

export interface Callback {
  callback(): void;
  callbackWithParam(result: any): void;
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    console.log("CognitoUtil constructor");
  }

  getUserPool() {
    return new CognitoUserPool(_POOL_DATA);
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }


  getCognitoIdentity(): string {
    return AWS.config.credentials.identityId;
  }

  getUserData() {
    return this.getCurrentUser().getSession(function (err, session) {
        if (err) {
            console.log("Can't set the credentials:" + err);
        } else {
            if (session.isValid()) {
                let data = JSON.stringify(session.idToken.payload);
                data = JSON.parse(data.replace('custom:',''));
                return data;
            }
        }
    });
}

  getAccessToken(callback: Callback): void {
    if (callback == null) {
      throw ("callback in getAccessToken is null...returning");
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log("Can't set the credentials:" + err);
        callback.callbackWithParam(null);
      }

      else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getAccessToken().getJwtToken());
        }
      }
    });
  }

  getIdToken(callback: Callback): void {
    if (callback == null) {
      throw ("callback in getIdToken is null...returning");
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log("Can't set the credentials:" + err);
        callback.callbackWithParam(null);
      }
      else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getIdToken().getJwtToken());
        } else {
          console.log("Got the id token, but the session isn't valid");
        }
      }
    });
  }

  getRefreshToken(callback: Callback): void {
    if (callback == null) {
      throw ("callback in getRefreshToken is null...returning");
    }
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log("Can't set the credentials:" + err);
        callback.callbackWithParam(null);
      }

      else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getRefreshToken());
        }
      }
    });
  }
}
