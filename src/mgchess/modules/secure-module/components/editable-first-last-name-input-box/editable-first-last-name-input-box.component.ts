/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: editable-first-last-name-input-box.component.ts
 * Last modified: 07.12.2022, 16:57
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
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FirstLastNameFormModel } from "../../models/first-last-name-form.model";
import { NgFormsService } from "../../../shared-module/services/ng-forms.service";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-editable-first-last-name-input-box",
    templateUrl: "./editable-first-last-name-input-box.component.html",
    providers: [ NgFormsService, ValidatorPatternConstants ],
})
export class EditableFirstLastNameInputBoxComponent {

    @Input() _firstNameValue: string = "";
    @Input() _lastNameValue: string = "";

    _fullNameFormGroup!: FormGroup;
    _suspenseLoader: boolean = false;
    _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        private _regex: ValidatorPatternConstants,
    ) {
        this._fullNameFormGroup = new FormGroup({
            firstName: new FormControl("", [ Validators.required, Validators.pattern(_regex.USERNAME_REGEX) ]),
            lastName: new FormControl("", [ Validators.pattern(_regex.USERNAME_REGEX) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    handleSetDefaultValues(): void {
        this._fullNameFormGroup.patchValue({ firstName: this._firstNameValue, lastName: this._lastNameValue });
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage === "") return;
        this._serverResponse = new SimpleMessageResWithErrorModel("", false);
    };

    handleCloseValueBoxAndSaveChanges(): void {
        const data = this._ngFormsService.extractFormFields<FirstLastNameFormModel>(this._fullNameFormGroup);
        console.log("sending data...", data);
    };

    handleCloseValueBoxAndRemove(): void {
        console.log('removing data...');
    };
}
