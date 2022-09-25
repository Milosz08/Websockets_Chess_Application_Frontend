/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth-register-page-routing.module.ts
 * Last modified: 21/08/2022, 22:14
 * Project name: chess-app-frontend
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL
 * COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthRegisterPageComponent } from "./auth-register-page.component";

import { LogInPageComponent } from "./pages/log-in-page/log-in-page.component";
import { SingUpPageComponent } from "./pages/sign-up-page/sing-up-page.component";
import { FinishSignUpPageComponent } from "./pages/finish-sign-up-page/finish-sign-up-page.component";
import { ForgotPasswordPageComponent } from "./pages/forgot-password-page/forgot-password-page.component";
import { ActivateAccountPageComponent } from "./pages/activate-account-page/activate-account-page.component";

//----------------------------------------------------------------------------------------------------------------------

const routes: Routes = [
    { path: "", component: AuthRegisterPageComponent, children: [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login", component: LogInPageComponent },
        { path: "signup", component: SingUpPageComponent },
        { path: "forgot-password", component: ForgotPasswordPageComponent },
        { path: "activate-account", component: ActivateAccountPageComponent },
        { path: "finish-signup", component: FinishSignUpPageComponent },
    ]},
];

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AuthRegisterPageRoutingModule {}
