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

import { Component, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { StaticGenderDataResModel } from "../../models/static-gender-data-res.model";
import { StaticDataReqResService } from "../../services/static-data-req-res.service";
import { StaticCountryDataResModel } from "../../models/static-country-data-res.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-singup-right-content-form",
    templateUrl: "./signup-right-content-form.component.html",
    providers: [ StaticDataReqResService, FormInputClassesConstants ],
})
export class SignupRightContentFormComponent implements OnDestroy {

    @Input() _signupForm!: FormGroup;

    _staticGenderData!: StaticGenderDataResModel;
    _staticCountryData!: StaticCountryDataResModel;

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<AuthReducerType>,
        private _resReqService: StaticDataReqResService,
        public _cssConstants: FormInputClassesConstants,
    ) {
        RxjsHelper.subscribeObservable(this._resReqService.getRegisterGenderData(), this._ngUnsubscribe)
            .subscribe(data => this._staticGenderData = data);
        RxjsHelper.subscribeObservable(this._resReqService.getRegisterCountryData(), this._ngUnsubscribe)
            .subscribe(data => this._staticCountryData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleClearServerResponse(): void {
        this._store.dispatch(NgrxAction_ATH.__cleanServerResponse());
    };
}
