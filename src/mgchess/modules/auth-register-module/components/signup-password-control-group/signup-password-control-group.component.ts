/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-password-control-group.component.ts
 * Last modified: 14/09/2022, 01:26
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

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { ValidatorConstraint } from "../../../../validator-helpers/angular-form.validator";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { PasswordStrengthMeterService } from "../../services/password-strength-meter.service";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-signup-password-control-group",
    templateUrl: "./signup-password-control-group.component.html",
    providers: [ PasswordStrengthMeterService, FormInputClassesConstants ],
})
export class SignupPasswordControlGroupComponent implements OnInit, OnDestroy {

    @Input() _formData!: FormGroup;

    _serverResponseIsEmpty!: boolean;

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();
    readonly _passwordSAreNotTheSame = ValidatorConstraint.PASSWORDS_ARE_NOT_THE_SAME;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
        public _cssConstants: FormInputClassesConstants,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponseIsEmpty, this._ngUnsubscribe,
                data => this._serverResponseIsEmpty = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleClearServerResponse(): void {
        if (this._serverResponseIsEmpty) return;
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
    };
}
