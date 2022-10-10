/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-form-acceptable-control-group.component.ts
 * Last modified: 15/09/2022, 21:00
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
import { AbstractControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-signup-form-acceptable-control-group",
    templateUrl: "./signup-form-acceptable-control-group.component.html",
    styleUrls: [ "./signup-form-acceptable-control-group.component.scss" ],
})
export class SignupFormAcceptableControlGroupComponent implements OnInit, OnDestroy {

    @Input() _signupForm!: FormGroup;

    _hasPrivacyPolicyAccept!: AbstractControl<any, any>;
    _hasNewsletterAccept!: AbstractControl<any, any>;

    _serverResponseIsEmpty!: boolean;
    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._hasPrivacyPolicyAccept = this._formHelper.field("hasPrivacyPolicyAccept", this._signupForm);
        this._hasNewsletterAccept = this._formHelper.field("hasNewsletterAccept", this._signupForm);
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponseIsEmpty, this._ngUnsubscribe,
                data => this._serverResponseIsEmpty = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSelectAllAcceptionFields(isChecked: boolean): void {
        this.handleClearServerResponse();
        this._hasPrivacyPolicyAccept.setValue(isChecked);
        this._hasNewsletterAccept.setValue(isChecked);
    };

    handleClearServerResponse(): void {
        if (this._serverResponseIsEmpty) return;
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
    };

    get __globalAcceptCheckboxState(): boolean {
        return this._hasPrivacyPolicyAccept.value && this._hasNewsletterAccept.value;
    };
}
