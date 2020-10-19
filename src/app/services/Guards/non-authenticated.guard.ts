import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from "../cognito.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanActivate {

  constructor(
    private cUtil: CognitoService,
    private router: Router
  ) { }
  // canActivate chamando uma função externa não pode retornar router.urlTree ou etc.
  // Tentar realizar todas as ações dentro do canActivate ou então habilitar a função
  // isAuthenticated para retornal urlTree;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let returnetValue: any;

    if (this.isAuthenticated()) {
      returnetValue = true;
    } else {
      returnetValue = this.router.parseUrl("/home");
    }

    return returnetValue;
  }

  isAuthenticated(): boolean {
    console.log("Inside NonAuthGuard");
    let userIsAllowed = true;
    let cognitoUser = this.cUtil.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("No session was found!");
        } else {
          if (session.isValid()) {
            console.log("Cant allow you to pass! -------------------");
            userIsAllowed = false;
          }
        }
      });
    } else {
      console.log("No session was found either!");
    }
    return userIsAllowed;
  }

}
