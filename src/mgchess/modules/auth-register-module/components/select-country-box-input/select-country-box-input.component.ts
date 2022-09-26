/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: select-country-box-input.component.ts
 * Last modified: 26/09/2022, 01:23
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

import { StaticDataReqResService } from "../../services/static-data-req-res.service";
import { StaticCountryDataResModel } from "../../models/static-country-data-res.model";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-select-country-box-input",
    templateUrl: "./select-country-box-input.component.html",
    providers: [ FormInputClassesConstants, StaticDataReqResService ],
})
export class SelectCountryBoxInputComponent implements OnInit, OnDestroy {

    @Input() _formGroup!: FormGroup;

    _staticCountryData!: StaticCountryDataResModel;
    _serverResponseIsEmpty: boolean = true;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<AuthReducerType>,
        public _cssConstants: FormInputClassesConstants,
        private _reqResService: StaticDataReqResService,
    ) {
    };

    ngOnInit(): void {
        RxjsHelper.subscribeObservable(this._reqResService.getRegisterCountryData(), this._ngUnsubscribe,
            data => this._staticCountryData = data);
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
