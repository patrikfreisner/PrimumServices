import { Component, OnInit } from "@angular/core";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";
import { formatDate } from '@angular/common';

import { UserLoginService } from "../services/user-login.service";
import { RouterExtensions } from "nativescript-angular";
import { CognitoService } from "../services/cognito.service";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public currentUser: any;
    constructor(
        public userLoginService: UserLoginService,
        public cUtil: CognitoService,
        public router: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.currentUser = this.cUtil.getUserData();
        console.log(this.currentUser);
    }

    logout() {
        this.userLoginService.logout();
        this.router.navigate(["/login"], { clearHistory: true });
    }

    alertOptions: AlertOptions = {
        title: "Confirme sua escolha!",
        message: "Você deseja iniciar seu trabalho em " + this.jobName + "?",
        okButtonText: "OK",
        cancelable: true // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
    };

    alertOptionsInit: AlertOptions = {
        title: "Bom Trabalho... :)",
        message: "Você iniciou as " + formatDate(new Date(), 'HH:mm', 'en'),
        okButtonText: "OK",
        cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
    };

    onTapTest() {
        alert(this.alertOptions).then(
            () => {
                alert(this.alertOptionsInit);
            }
        );
    }
}
