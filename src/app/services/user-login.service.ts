import { Injectable } from '@angular/core';
import { CognitoCallback, CognitoService, LoggedInCallback } from "./cognito.service";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js/dist/amazon-cognito-identity";

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(public cUtil: CognitoService) {
  }

  authenticate(username: string, password: string, callback: CognitoCallback) {

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    // AWSCognito.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' })

    let authenticationData = {
      Username: username,
      Password: password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    console.log("Authenticating the user");
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        callback.cognitoCallback(null, result);

      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      },
    });
  }

  forgotPassword(username: string, callback: CognitoCallback) {
    let userData = {
      Username: username,
      Pool: this.cUtil.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {

      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
    let userData = {
      Username: email,
      Pool: this.cUtil.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (result) {
        callback.cognitoCallback(null, result);
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null);
      }
    });
  }

  logout() {
    console.log("Logging out");
    this.cUtil.getCurrentUser().signOut();
  }

  isAuthenticated(callback: LoggedInCallback) {
    if (callback == null)
      throw ("Callback in isAuthenticated() cannot be null");

    console.log("Getting the current user");
    let cognitoUser = this.cUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("Couldn't get the session: " + err, err.stack);
          callback.isLoggedInCallback(err, false);
        }
        else {
          console.log("Session is valid: " + session.isValid());
          callback.isLoggedInCallback(err, session.isValid());
        }
      });
    } else {
      callback.isLoggedInCallback("Can't retrieve the CurrentUser", false);
    }
  }
}
