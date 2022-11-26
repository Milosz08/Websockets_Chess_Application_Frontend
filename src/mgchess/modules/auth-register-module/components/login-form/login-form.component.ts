/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: login-form.component.ts
 * Last modified: 08/09/2022, 16:49
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

import { Observable, Subject, takeUntil } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { LoginFormModel } from "../../models/login-form.model";
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import { GlobalSuspenseService } from "../../../shared-module/services/global-suspense.service";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { OAuthSupplier } from "../../../../http-request-helpers/oauth2-request-endpoints.contants";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

import { SessionWithAuthCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.actions";
import * as NgrxSelector_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-login-form",
    templateUrl: "./login-form.component.html",
    providers: [ ValidatorPatternConstants, FormInputClassesConstants, GlobalSuspenseService ],
})
export class LoginFormComponent implements OnInit, OnDestroy {

    @Input() _oauth2ResSupplier: string = "";
    @Input() _ifIncludesAnyQueryParams: boolean = false;
    @Input() _oauth2ServerResponseError: string = "";

    _loginForm: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.ATTEMPT_LOGIN_VIA_LOCAL));

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _regex: ValidatorPatternConstants,
        private _suspenseService: GlobalSuspenseService,
        public _cssConstants: FormInputClassesConstants,
        private _store: Store<SessionWithAuthCombinedReducerTypes>,
    ) {
        this._loginForm = new FormGroup({
            usernameEmail: new FormControl("", [ Validators.required ]),
            password: new FormControl("", [ Validators.required, Validators.pattern(_regex.PASSWORD_REGEX) ]),
            rememberAccount: new FormControl(true),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._loginForm.get("rememberAccount")!.setValue(true);
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_initialLoginInLoginForm, this._ngUnsubscribe,
                data => this._loginForm.setValue({ ...this._loginForm.getRawValue(), usernameEmail: data }));
        this._loginForm.get("usernameEmail")!.valueChanges.pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(data => this._store.dispatch(NgrxAction_ATH.__filledInitialLoginInLoginForm({ userLogin: data })));
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSubmitCredentialsAndAttemptLoginUser(): void {
        const req = this._formHelper.extractFormFields<LoginFormModel>(this._loginForm, false);
        this._store.dispatch(NgrxAction_SES.__attemptToLoginViaLocal({ loginForm: req }));
        this._loginForm.reset(new LoginFormModel("", "", true));
    };

    clearLoginServerResponse(): void {
        this.removeOAuth2ServerErrorQueryParam();
        if (this._serverResponse.responseMessage === "") return;
        this._store.dispatch(NgrxAction_SES.__clearServerResponse());
    };

    private removeOAuth2ServerErrorQueryParam(): void {
        if (this._oauth2ServerResponseError === "") return;
        this._suspenseService.removeQueryParams("error");
        this._oauth2ServerResponseError = "";
    };

    get __determinateLoadingSpinnerActive(): boolean {
        return !Boolean(Object.values(OAuthSupplier).find(s => s === this._oauth2ResSupplier))
            && this._serverResponse.responseMessage === '' && this._ifIncludesAnyQueryParams;
    };
}
