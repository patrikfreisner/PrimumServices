import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CognitoService } from '../cognito.service';
import { Observable } from 'rxjs';
import { _POOL_DATA } from "../properties.service";
import { Customer } from '~/app/Models/customer';

@Injectable({
  providedIn: 'root'
})
export class AWSService {
  private httpUrl = "";
  private baseUrl = "https://ur639cxhwf.execute-api.us-east-1.amazonaws.com/DEV/";
  constructor(
    private http: HttpClient,
    private authToken: CognitoService
  ) { }

  getTestExe(): Observable<Customer> {

    var authResult = this.authToken.getAuthToken();
    if (authResult != false) {
      const hValues = new HttpHeaders().set("Authorization", authResult.toString());
      return this.http.get<Customer>("https://ur639cxhwf.execute-api.us-east-1.amazonaws.com/DEV/customer/CSPRMB9A23E998754F21F", { headers: hValues });
    } else {
      throw new Error("Authorization failed!!!!");
    }

  }

  createNewCustomer(customer: Customer): Observable<any> {
    var custProp: any;
    custProp = <any> customer
    custProp.cognito_user = {
      userPoolId: _POOL_DATA.UserPoolId,
      userName: this.authToken.getCurrentUser().username
    };
    var authResult = this.authToken.getAuthToken();
    if (authResult != false) {
      const hValues = new HttpHeaders().set("Authorization", authResult.toString());
      return this.http.post<any>(this.baseUrl + "customer", custProp, { headers: hValues });
    } else {
      throw new Error("Authorization failed!!!!");
    }
  }

}
