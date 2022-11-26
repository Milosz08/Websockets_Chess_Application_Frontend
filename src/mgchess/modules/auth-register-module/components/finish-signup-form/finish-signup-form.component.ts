/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: finish-signup-form.component.ts
 * Last modified: 25/09/2022, 07:59
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
import { FinishSignupFormModel } from "../../models/finish-signup-form.model";
import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-finish-signup-form",
    templateUrl: "./finish-signup-form.component.html",
})
export class FinishSignupFormComponent implements OnInit, OnDestroy {

    _finishSignupForm: FormGroup;
    _serverResponse!: SimpleMessageResWithErrorModel;
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.FINISH_SIGNUP_VIA_OAUTH2));

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
    ) {
        this._finishSignupForm = new FormGroup({
            gender: new FormControl(null, [ Validators.required ]),
            birthDateDay: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(31) ]),
            birthDateMonth: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(12) ]),
            birthDateYear: new FormControl(null, [ Validators.required, Validators.min(1900) ]),
            countryName: new FormControl(null, [ Validators.required ]),
            hasNewsletterAccept: new FormControl(false),
            hasPrivacyPolicyAccept: new FormControl(false, [ Validators.requiredTrue ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSubmitSignupUserDetailsForm(): void {
        const req = this._formHelper.extractFormFields<FinishSignupFormModel>(this._finishSignupForm, false);
        this._store.dispatch(NgrxAction_ATH.__attemptToFinishSignupViaOAuth2({ finishSignupForm: req }));
        this._finishSignupForm.reset(FinishSignupFormModel.getDefaultValues());
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage !== "") return;
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
    };
}
