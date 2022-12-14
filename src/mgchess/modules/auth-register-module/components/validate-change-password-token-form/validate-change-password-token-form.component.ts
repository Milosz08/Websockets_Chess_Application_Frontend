/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: validate-change-password-token-form.component.ts
 * Last modified: 09/10/2022, 14:42
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ChangePasswordWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.actions";
import * as NgrxSelector_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-validate-change-password-data-form",
    templateUrl: "./validate-change-password-token-form.component.html",
    providers: [ ValidatorPatternConstants, FormInputClassesConstants ],
})
export class ValidateChangePasswordTokenFormComponent implements OnInit, OnDestroy {

    _userEmail: string = "";
    _validateTokenForm!: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;

    _userEmails$: Observable<Array<string>> = this._store.select(NgrxSelector_CPA.sel_changePasswordUserEmails);
    _resendSuspense$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.RESEND_CHANGE_PASSWORD_LINK));
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.VALIDATE_OTA_TOKEN_CHANGE_PASSWORD));

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _regex: ValidatorPatternConstants,
        public _cssConstants: FormInputClassesConstants,
        private _store: Store<ChangePasswordWithGfxCombinedReducerTypes>,
    ) {
        this._validateTokenForm = new FormGroup({
            otaToken: new FormControl("", [ Validators.required, Validators.pattern(_regex.OTA_TOKEN_REGEX) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_CPA.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_CPA.sel_changePasswordPrimaryUserEmail, this._ngUnsubscribe,
                data => this._userEmail = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage === "") return;
        this._store.dispatch(NgrxAction_CPA.__clearServerResponseData());
    };

    handleSubmitValidateOtaTokenForChangePassword(): void {
        const req = this._validateTokenForm.get("otaToken")!.value;
        this._store.dispatch(NgrxAction_CPA.__attemptToValidateChangePasswordViaOta({ otaToken: req }));
    };

    handleResendVerificationEmailMessage(): void {
        this._store.dispatch(NgrxAction_GFX.__attemptResendEmailForChangePassword({ emailAddress: this._userEmail }));
    };
}
