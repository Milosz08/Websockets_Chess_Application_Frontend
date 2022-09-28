/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: activate-account-token-form.component.ts
 * Last modified: 26/09/2022, 20:21
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

import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import { AuthWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-activate-account-token-form",
    templateUrl: "./activate-account-token-form.component.html",
    providers: [ ValidatorPatternConstants ],
})
export class ActivateAccountTokenFormComponent implements OnInit, OnDestroy {

    @Input() _cascadeResponseMessage: string = "";

    _activateTokenForm!: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;

    _suspenseForActivate$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_activateAccountViaOta);
    _suspenseForResend$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_resendActivateAccountLink);
    _userEmails$: Observable<Array<string>> = this._store.select(NgrxSelector_ATH.sel_finishSignupUserEmails);

    readonly _serverReqResHelper: ServerReqResHelper = new ServerReqResHelper();
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _regex: ValidatorPatternConstants,
        private _store: Store<AuthWithGfxCombinedReducerTypes>,
    ) {
        this._activateTokenForm = new FormGroup({
            otaToken: new FormControl("", [ Validators.required, Validators.pattern(_regex.OTA_TOKEN_REGEX) ]),
        });
    };

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponse, this._ngUnsubscribe,
            data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSubmitActivateAccountViaOtaToken(): void {
        console.log("sending form...");
    };

    handleResendVerificationEmailMessage(): void {
        console.log("resending verification email...");
    };
}
