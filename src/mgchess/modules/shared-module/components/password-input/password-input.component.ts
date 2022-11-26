/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: password-input.component.ts
 * Last modified: 09/09/2022, 02:54
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

import { FormInputClassesModel } from "../../../../models/form-input-classes.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-password-input",
    templateUrl: "./password-input.component.html",
})
export class PasswordInputComponent {

    _isFieldContentVisible: boolean = false;
    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    @Input() _form!: FormGroup;
    @Input() _topInfoLabel: string = "";
    @Input() _maxInputLength: number = 30;
    @Input() _inputId: string = "";
    @Input() _formControlName: string = "";
    @Input() _inputPlaceholder: string = "";
    @Input() _errorPlaceholder: string = "";
    @Input() _cssClasses: FormInputClassesModel = new FormInputClassesModel("", "", "");

    @Output() _emitCleanErrors: EventEmitter<void> = new EventEmitter<void>();

    //------------------------------------------------------------------------------------------------------------------

    handleDisposeDefaultState(): void {
        if (this._form.get(this._formControlName)!.value === "") {
            this._isFieldContentVisible = false;
        }
        this._emitCleanErrors.emit();
    };

    handleToggleInputVisibility(): void {
        if (this._form.get(this._formControlName)!.value !== "") {
            this._isFieldContentVisible = !this._isFieldContentVisible;
        }
    };

    get __materialIconIdentifier(): string {
        return this._isFieldContentVisible ? "visibility" : "visibility_off";
    };

    get __inputType(): string {
        return this._isFieldContentVisible ? "text" : "password";
    };
}
