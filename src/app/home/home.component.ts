import { Component, OnInit } from "@angular/core";
import { confirm } from "tns-core-modules/ui/dialogs";

import { UserLoginService } from "../services/user-login.service";
import { RouterExtensions } from "nativescript-angular";
import { CognitoService } from "../services/cognito.service";

import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData, exitEvent } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Router } from "@angular/router";
import { HomeBehaviorService } from "../services/home-behavior.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public currentUser: any;
    public userHasAvoidedCustomerForm: boolean;
    constructor(
        public userLoginService: UserLoginService,
        public homeBehave: HomeBehaviorService,
        public cUtil: CognitoService,
        public routerEx: RouterExtensions,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.currentUser = this.cUtil.getUserData();
        console.log(this.currentUser);
        this.userHasAvoidedCustomerForm = true;

        if (!isAndroid) {
            return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/home", false)) {
                data.cancel = true; // prevents default back button behavior
            }
        });

        if ((this.currentUser.customer_fk_uuid == null || this.currentUser.customer_fk_uuid == '') && this.homeBehave.getUserHasAvoidedCustomerForm() != true) {
            this.routerEx.navigate(["/subscustomer"]);
        } else if (this.currentUser.customer_fk_uuid != null && this.currentUser.customer_fk_uuid != '') {
            this.userHasAvoidedCustomerForm = false;
        }
    }

    goToRegister() {
        this.routerEx.navigate(["/subscustomer"]);
    }

    logout() {
        this.userLoginService.logout();
        this.routerEx.navigate(["/login"], { clearHistory: true });
    }
}
