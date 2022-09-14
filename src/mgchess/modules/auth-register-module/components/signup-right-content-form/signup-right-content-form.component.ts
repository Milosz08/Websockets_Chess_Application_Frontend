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

import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-singup-right-content-form",
    templateUrl: "./signup-right-content-form.component.html",
    styleUrls: [ "./signup-right-content-form.component.scss" ],
})
export class SignupRightContentFormComponent implements OnInit {

    @Input() _singupForm!: FormGroup;

    _hasPrivacyPolicyAccept!: AbstractControl<any, any>;
    _hasNewsletterAccept!: AbstractControl<any, any>;

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    constructor(
        private _store: Store<AuthReducerType>,
    ) {
    };

    ngOnInit(): void {
        this._hasPrivacyPolicyAccept = this._formHelper.field("hasPrivacyPolicyAccept", this._singupForm);
        this._hasNewsletterAccept = this._formHelper.field("hasNewsletterAccept", this._singupForm);
    }

    handleClearServerResponse(): void {
        this._store.dispatch(NgrxAction_ATH.__cleanServerResponse());
    };

    handleSelectAllAcceptionFields(isChecked: boolean): void {
        this.handleClearServerResponse();
        this._hasPrivacyPolicyAccept.setValue(isChecked);
        this._hasNewsletterAccept.setValue(isChecked);
    };

    get __globalAcceptCheckboxState(): boolean {
        return this._hasPrivacyPolicyAccept.value && this._hasNewsletterAccept.value;
    };
}
