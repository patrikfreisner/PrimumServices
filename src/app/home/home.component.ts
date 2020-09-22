import { Component, OnInit } from "@angular/core";
import { confirm } from "tns-core-modules/ui/dialogs";

import { UserLoginService } from "../services/user-login.service";
import { RouterExtensions } from "nativescript-angular";
import { CognitoService } from "../services/cognito.service";

import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData, exitEvent } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public currentUser: any;
    constructor(
        public userLoginService: UserLoginService,
        public cUtil: CognitoService,
        public routerEx: RouterExtensions,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.currentUser = this.cUtil.getUserData();
        console.log(this.currentUser);

        if (!isAndroid) {
            return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive("/home", false)) {
                data.cancel = true; // prevents default back button behavior
            }
        });
    }

    logout() {
        this.userLoginService.logout();
        this.routerEx.navigate(["/login"], { clearHistory: true });
    }
}
