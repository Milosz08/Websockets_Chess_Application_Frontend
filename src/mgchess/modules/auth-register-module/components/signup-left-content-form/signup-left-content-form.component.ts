/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-left-content-form.component.ts
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

import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ValidatorConstraint } from "../../../../validator-helpers/angular-form.validator";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-singup-left-content-form",
    templateUrl: "./signup-left-content-form.component.html",
})
export class SignupLeftContentFormComponent {

    @Input() _signupForm!: FormGroup;

    _secondEmailInputVisibility: boolean = false;

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();
    readonly _emailAddressesAreTheSame = ValidatorConstraint.EMAIL_ADDRESSES_ARE_THE_SAME;

    handleToggleSecondEmailInputVisibility(): void {
        this._secondEmailInputVisibility = !this._secondEmailInputVisibility;
        this._formHelper.field("secondEmailAddress", this._signupForm).setValue("");
    };
}
