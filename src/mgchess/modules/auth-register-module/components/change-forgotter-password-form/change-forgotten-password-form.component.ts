/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-forgotten-password-form.component.ts
 * Last modified: 09/10/2022, 20:23
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

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { NgFormsService } from "../../../shared-module/services/ng-forms.service";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";
import { AngularFormValidator, ValidatorConstraint } from "../../../../validator-helpers/angular-form.validator";

import { ChangePasswordReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ChangeForgottenPasswordReqModel } from "../../ngrx-store/change-password-ngrx-store/ngrx-models/change-forgotten-password-req.model";
import { ChangePasswordUserDetailsResModel } from "../../ngrx-store/change-password-ngrx-store/ngrx-models/change-password-user-details-res.model";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.actions";
import * as NgrxSelector_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-change-forgotten-password-form",
    templateUrl: "./change-forgotten-password-form.component.html",
    providers: [ NgFormsService, AngularFormValidator, ValidatorPatternConstants, FormInputClassesConstants ],
})
export class ChangeForgottenPasswordFormComponent implements OnInit, OnDestroy {

    @Input() _bearerToken: string = "";

    _renewPasswordForm!: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;
    _userDetails!: ChangePasswordUserDetailsResModel;

    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.CHANGE_FORGOTTER_PASSWORD));

    readonly _passwordSAreNotTheSame = ValidatorConstraint.PASSWORDS_ARE_NOT_THE_SAME;
    readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        private _validator: AngularFormValidator,
        private _regex: ValidatorPatternConstants,
        public _cssConstants: FormInputClassesConstants,
        private _store: Store<ChangePasswordReducerType>,
    ) {
        this._renewPasswordForm = new FormGroup({
            password: new FormControl("", [ Validators.required, Validators.pattern(_regex.PASSWORD_REGEX) ]),
            passwordRepeat: new FormControl("", [ Validators.required ]),
        }, {
            validators: [ _validator.passwordMismatchValidate ],
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_CPA.sel_changePasswordUserDetails, this._ngUnsubscribe,
            data => this._userDetails = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_CPA.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage === "") return;
        this._store.dispatch(NgrxAction_CPA.__clearServerResponseData());
    };

    handleSubmitChangedForgotterPassword(): void {
        const req = this._ngFormsService.extractFormFields<ChangeForgottenPasswordReqModel>(this._renewPasswordForm, true);
        this._store.dispatch(NgrxAction_CPA.__attemptToChangeForgottenPassword({
            credentials: req, jwtToken: this._bearerToken }));
    };
}
