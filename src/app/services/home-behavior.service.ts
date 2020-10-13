import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeBehaviorService {
  public userHasAvoidedCustomerFormValue = false;
  constructor() { }

  getUserHasAvoidedCustomerForm(): boolean {
    return this.userHasAvoidedCustomerFormValue;
  }

  setUserHasAvoidedCustomerForm(value: boolean): void {
    this.userHasAvoidedCustomerFormValue = value;
  }
}
