/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-form-text-input.component.ts
 * Last modified: 14/09/2022, 00:54
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

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-signup-form-text-input",
    templateUrl: "./signup-form-text-input.component.html",
})
export class SignupFormTextInputComponent {

    @Input() _singupForm!: FormGroup;
    @Input() _controlMaxLength: number = 30;
    @Input() _formControlName: string = "";
    @Input() _formControlPlaceholder: string = "";
    @Input() _additionalControlText: string = "";
    @Input() _controlErrorText: string = "";

    @Output() _clearResponseEmitter: EventEmitter<void> = new EventEmitter<void>();

    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    get __inputElementId(): string {
        return `signup-form__${this._formControlName}-input`;
    };
}