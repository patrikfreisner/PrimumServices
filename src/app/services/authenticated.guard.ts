import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from "../services/cognito.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private cUtil: CognitoService,
    private route: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let returnedValue: any;

    if (this.isAuthenticated()) {
      returnedValue = true;
    } else {
      returnedValue = this.route.parseUrl("/login");
    }

    return returnedValue;
  }

  isAuthenticated(): boolean {
    let userIsAllowed = false;
    let cognitoUser = this.cUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(
        (session) => {
          userIsAllowed = true;
        },
        (err) => {
          alert("Erro não foi possivel pegar o usuario e tals!");
        }

      );
    }
    return userIsAllowed;
  }

}
