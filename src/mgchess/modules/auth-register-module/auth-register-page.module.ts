/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth-register-page.module.ts
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
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { LogInPageComponent } from "./pages/log-in-page/log-in-page.component";
import { SingUpPageComponent } from "./pages/sign-up-page/sing-up-page.component";
import { ForgotPasswordPageComponent } from "./pages/forgot-password-page/forgot-password-page.component";
import { ActivateAccountPageComponent } from './pages/activate-account-page/activate-account-page.component';

import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LastLoginsComponent } from "./components/last-logins/last-logins.component";
import { SignupFormTextInputComponent } from './components/signup-form-text-input/signup-form-text-input.component';
import { SignupLeftContentFormComponent } from './components/signup-left-content-form/signup-left-content-form.component';
import { SignupRightContentFormComponent } from './components/signup-right-content-form/signup-right-content-form.component';
import { SignupPasswordControlGroupComponent } from './components/signup-password-control-group/signup-password-control-group.component';
import { SignupFormBirthdayControlGroupComponent } from './components/signup-form-birthday-control-group/signup-form-birthday-control-group.component';
import { SignupFormAcceptableControlGroupComponent } from './components/signup-form-acceptable-control-group/signup-form-acceptable-control-group.component';

import { SharedModuleModule } from "../shared-module/shared-module.module";
import { AuthRegisterPageComponent } from "./auth-register-page.component";
import { AuthRegisterPageRoutingModule } from "./auth-register-page-routing.module";

import { authNgrxStore } from "./ngrx-store/auth-ngrx-store/auth.reducer";
import { LoginViaLocalEffects } from "./ngrx-store/auth-ngrx-store/ngrx-effects/login-via-local.effects";
import { SignupViaLocalEffects } from "./ngrx-store/auth-ngrx-store/ngrx-effects/signup-via-local.effects";

import { AuthReqResService } from "./services/auth-req-res.service";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // pages
        LogInPageComponent,
        SingUpPageComponent,
        ForgotPasswordPageComponent,
        ActivateAccountPageComponent,
        // components
        LoginFormComponent,
        LastLoginsComponent,
        SignupFormTextInputComponent,
        SignupLeftContentFormComponent,
        SignupRightContentFormComponent,
        SignupPasswordControlGroupComponent,
        SignupFormBirthdayControlGroupComponent,
        SignupFormAcceptableControlGroupComponent,
        // others
        AuthRegisterPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModuleModule,
        ReactiveFormsModule,
        AuthRegisterPageRoutingModule,
        StoreModule.forFeature(authNgrxStore.reducerName, authNgrxStore.reducerFunc),
        EffectsModule.forFeature([
            LoginViaLocalEffects,
            SignupViaLocalEffects,
        ]),
    ],
    providers: [
        // services
        AuthReqResService,
    ],
})
export class AuthRegisterPageModule {}
