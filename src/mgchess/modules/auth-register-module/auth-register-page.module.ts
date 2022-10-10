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
import { FinishSignUpPageComponent } from "./pages/finish-sign-up-page/finish-sign-up-page.component";
import { ForgotPasswordPageComponent } from "./pages/forgot-password-page/forgot-password-page.component";
import { ChangePasswordPageComponent } from "./pages/change-password-page/change-password-page.component";
import { ActivateAccountPageComponent } from "./pages/activate-account-page/activate-account-page.component";

import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LastLoginsComponent } from "./components/last-logins/last-logins.component";
import { FinishSignupFormComponent } from "./components/finish-signup-form/finish-signup-form.component";
import { SignupFormTextInputComponent } from "./components/signup-form-text-input/signup-form-text-input.component";
import { SelectGenderBoxInputComponent } from "./components/select-gender-box-input/select-gender-box-input.component";
import { PasswordStrengthMeterComponent } from "./components/password-strength-meter/password-strength-meter.component";
import { SelectCountryBoxInputComponent } from "./components/select-country-box-input/select-country-box-input.component";
import { SignupLeftContentFormComponent } from "./components/signup-left-content-form/signup-left-content-form.component";
import { SignupRightContentFormComponent } from "./components/signup-right-content-form/signup-right-content-form.component";
import { ActivateAccountTokenFormComponent } from "./components/activate-account-token-form/activate-account-token-form.component";
import { SignupPasswordControlGroupComponent } from "./components/signup-password-control-group/signup-password-control-group.component";
import { ChangeForgottenPasswordFormComponent } from "./components/change-forgotter-password-form/change-forgotten-password-form.component";
import { SignupFormBirthdayControlGroupComponent } from "./components/signup-form-birthday-control-group/signup-form-birthday-control-group.component";
import { ValidateChangePasswordTokenFormComponent } from "./components/validate-change-password-token-form/validate-change-password-token-form.component";
import { ForgotPasswordNicknameEmailFormComponent } from "./components/forgot-password-nickname-email-form/forgot-password-nickname-email-form.component";
import { SignupFormAcceptableControlGroupComponent } from "./components/signup-form-acceptable-control-group/signup-form-acceptable-control-group.component";

import { SharedModuleModule } from "../shared-module/shared-module.module";
import { AuthRegisterPageComponent } from "./auth-register-page.component";
import { AuthRegisterPageRoutingModule } from "./auth-register-page-routing.module";

import { authNgrxStore } from "./ngrx-store/auth-ngrx-store/auth.reducer";
import { changePasswordNgrxStore } from "./ngrx-store/change-password-ngrx-store/change-password.reducer";

import { SignupEffects } from "./ngrx-store/auth-ngrx-store/ngrx-effects/signup.effects";
import { LoginEffects } from "../shared-module/ngrx-store/session-ngrx-store/ngrx-effects/login.effects";
import { SignupActivateEffects } from "./ngrx-store/auth-ngrx-store/ngrx-effects/signup-activate.effects";
import { ChangePasswordEffects } from "./ngrx-store/change-password-ngrx-store/ngrx-effects/change-password.effects";
import { AttemptToChangePasswordEffects } from "./ngrx-store/change-password-ngrx-store/ngrx-effects/attempt-to-change-password.effects";

import { AuthReqResService } from "./services/auth-req-res.service";
import { StaticDataReqResService } from "./services/static-data-req-res.service";
import { ValidateOauth2UserService } from "./services/validate-oauth2-user.service";
import { SaveUserLoginStorageService } from "./services/save-user-login-storage.service";
import { ChangePasswordReqResService } from "./services/change-password-req-res.service";
import { PasswordStrengthMeterService } from "./services/password-strength-meter.service";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // pages
        LogInPageComponent,
        SingUpPageComponent,
        FinishSignupFormComponent,
        FinishSignUpPageComponent,
        ChangePasswordPageComponent,
        ForgotPasswordPageComponent,
        ActivateAccountPageComponent,
        // components
        LoginFormComponent,
        LastLoginsComponent,
        SignupFormTextInputComponent,
        SelectGenderBoxInputComponent,
        SignupLeftContentFormComponent,
        SelectCountryBoxInputComponent,
        PasswordStrengthMeterComponent,
        SignupRightContentFormComponent,
        ActivateAccountTokenFormComponent,
        SignupPasswordControlGroupComponent,
        ChangeForgottenPasswordFormComponent,
        SignupFormBirthdayControlGroupComponent,
        ForgotPasswordNicknameEmailFormComponent,
        ValidateChangePasswordTokenFormComponent,
        SignupFormAcceptableControlGroupComponent,
        // others
        AuthRegisterPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModuleModule,
        ReactiveFormsModule,
        AuthRegisterPageRoutingModule,
        // ngrx store
        StoreModule.forFeature(authNgrxStore.reducerName, authNgrxStore.reducerFunc),
        StoreModule.forFeature(changePasswordNgrxStore.reducerName, changePasswordNgrxStore.reducerFunc),
        EffectsModule.forFeature([
            LoginEffects,
            SignupEffects,
            ChangePasswordEffects,
            SignupActivateEffects,
            AttemptToChangePasswordEffects,
        ]),
    ],
    providers: [
        // services
        AuthReqResService,
        StaticDataReqResService,
        ValidateOauth2UserService,
        SaveUserLoginStorageService,
        ChangePasswordReqResService,
        PasswordStrengthMeterService,
    ],
})
export class AuthRegisterPageModule {}
