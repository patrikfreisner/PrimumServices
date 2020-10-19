import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { FindJobDetailsComponent } from './find-job-details/find-job-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { SubscribeCustomerComponent } from './subscribe-customer/subscribe-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'nativescript-input-mask/angular';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputMaskModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        FindJobsComponent,
        FindJobDetailsComponent,
        RegistrationComponent,
        SubscribeCustomerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
