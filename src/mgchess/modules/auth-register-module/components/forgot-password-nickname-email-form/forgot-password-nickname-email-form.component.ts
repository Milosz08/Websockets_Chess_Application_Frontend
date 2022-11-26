/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: forgot-password-nickname-email-form.component.ts
 * Last modified: 09/10/2022, 14:16
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
import { ChangePasswordWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.actions";
import * as NgrxSelector_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-forgot-password-nickname-email-form",
    templateUrl: "./forgot-password-nickname-email-form.component.html",
    providers: [ ValidatorPatternConstants ],
})
export class ForgotPasswordNicknameEmailFormComponent implements OnInit, OnDestroy {

    _attemptToChangePasswordForm!: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;

    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.ATTEMPT_CHANGE_PASSWORD));

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _regex: ValidatorPatternConstants,
        private _store: Store<ChangePasswordWithGfxCombinedReducerTypes>,
    ) {
        this._attemptToChangePasswordForm = new FormGroup({
            nicknameEmail: new FormControl("", [ Validators.required, Validators.max(100) ])
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
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

    handleSubmitAttemptToChangePassword(): void {
        const usernameEmail = this._attemptToChangePasswordForm.get("nicknameEmail")!.value;
        this._store.dispatch(NgrxAction_CPA.__attemptToSendRequestToChangePassword({ usernameEmail }));
        this._attemptToChangePasswordForm.reset();
    };
}
