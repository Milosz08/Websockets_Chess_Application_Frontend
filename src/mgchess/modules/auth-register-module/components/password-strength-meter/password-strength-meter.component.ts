/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: password-strength-meter.component.ts
 * Last modified: 09/10/2022, 22:28
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

import { Component, Input, OnChanges, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Subject, takeUntil } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { PasswordStrength, PasswordStrengthMeterService } from "../../services/password-strength-meter.service";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-password-strength-meter",
    templateUrl: "./password-strength-meter.component.html",
    styleUrls: [ "./password-strength-meter.component.scss" ],
})
export class PasswordStrengthMeterComponent implements OnChanges, OnDestroy {

    @Input() _formData!: FormGroup;

    _passwordScore: PasswordStrength = new PasswordStrength(0, "none");

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
        private _passwordMeterService: PasswordStrengthMeterService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
        this._formHelper.field("password", this._formData).valueChanges.pipe(takeUntil(this._ngUnsubscribe))
            .subscribe(data => {
                if (!Boolean(data)) {
                    this._passwordScore = new PasswordStrength(0, "none");
                } else {
                    this._passwordScore = this._passwordMeterService.computePasswordPower(data);
                }
            });
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
