/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: sing-up-page.component.ts
 * Last modified: 22/08/2022, 13:15
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

import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { SignupFormModel } from "../../models/signup-form.model";
import { BrowserThemeDetector } from "../../../../browster-utils/browser-theme.detector";
import { AngularFormValidator } from "../../../../validator-helpers/angular-form.validator";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-register-page",
    templateUrl: "./sing-up-page.component.html",
    styleUrls: [ "./sing-up-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container remove-margin__small-devices" },
    providers: [ AngularFormValidator, ValidatorPatternConstants ],
})
export class SingUpPageComponent extends BrowserMetaSerializatorLoader {

    _signupForm: FormGroup;

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<AuthReducerType>,
        private _validator: AngularFormValidator,
        private _regex: ValidatorPatternConstants,
    ) {
        super(_titleService, _metaService, SingleModuleType.AUTH_REGISTER_MODULE, SinglePageType.SIGN_UP_PAGE);
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
        this._signupForm = new FormGroup({
            nickname: new FormControl("", [ Validators.required, Validators.pattern(_regex.NICKNAME_REGEX) ]),
            firstName: new FormControl("", [ Validators.required, Validators.pattern(_regex.USERNAME_REGEX) ]),
            lastName: new FormControl("", [ Validators.required, Validators.pattern(_regex.USERNAME_REGEX) ]),
            emailAddress: new FormControl("", [ Validators.required, Validators.email ]),
            secondEmailAddress: new FormControl("", [ Validators.email ]),
            password: new FormControl("", [ Validators.required, Validators.pattern(_regex.PASSWORD_REGEX) ]),
            passwordRepeat: new FormControl("", [ Validators.required ]),
            gender: new FormControl(null, [ Validators.required ]),
            birthDateDay: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(31) ]),
            birthDateMonth: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(12) ]),
            birthDateYear: new FormControl(null, [ Validators.required, Validators.min(1900) ]),
            countryName: new FormControl(null, [ Validators.required ]),
            hasNewsletterAccept: new FormControl(false),
            hasPrivacyPolicyAccept: new FormControl(false, [ Validators.requiredTrue ])
        }, {
            validators: [ _validator.passwordMismatchValidate, _validator.twoEmailAddressesAreNotEqualsValidate ],
        });
    };

    selectApplicationLogoBasedCurrentTheme(): string {
        return BrowserThemeDetector.getLogoSrcBasedCurrentTheme();
    };

    handleSubmitRegisterFormData(): void {
        const req = this._formHelper.extractFormFields<SignupFormModel>(this._signupForm, false);
        this._store.dispatch(NgrxAction_ATH.__attemptToSingUpViaLocal({ signupForm: req }));
        this._signupForm.reset(SignupFormModel.getDefaultValues());
    };
}
