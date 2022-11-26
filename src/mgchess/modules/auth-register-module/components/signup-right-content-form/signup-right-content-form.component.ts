/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-right-content-form.component.ts
 * Last modified: 12/09/2022, 18:44
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
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-singup-right-content-form",
    templateUrl: "./signup-right-content-form.component.html",
})
export class SignupRightContentFormComponent implements OnInit, OnDestroy {

    @Input() _signupForm!: FormGroup;

    _serverResponse!: SimpleMessageResWithErrorModel;
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.ATTEMPT_SIGNUP_VIA_LOCAL));

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store,NgrxSelector_ATH.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
