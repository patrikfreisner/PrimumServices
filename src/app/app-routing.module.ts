import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { FindJobsComponent } from "./find-jobs/find-jobs.component";
import { FindJobDetailsComponent } from "./find-job-details/find-job-details.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthenticatedGuard } from "./services/authenticated.guard";
import { NonAuthenticatedGuard } from "./services/non-authenticated.guard";

const routes: Routes = [
    {
        path: "", redirectTo: "/home", pathMatch: "full"
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "registration", component: RegistrationComponent
    },
    {
        path: "home", component: HomeComponent, canActivate: [AuthenticatedGuard]
    },
    {
        path: "services", component: FindJobsComponent, canActivate: [AuthenticatedGuard]
    },
    {
        path: "services/:id", component: FindJobDetailsComponent, canActivate: [AuthenticatedGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
