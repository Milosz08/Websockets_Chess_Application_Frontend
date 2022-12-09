/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: editable-gender-input-box.component.ts
 * Last modified: 07.12.2022, 17:19
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

import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { GenderFormModel } from "../../models/gender-form.model";
import { NgFormsService } from "../../../shared-module/services/ng-forms.service";
import { SimpleDataTupleModel } from "../../../../models/simple-data-tuple.model";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { StaticDataReqResService } from "../../../shared-module/services/static-data-req-res.service";
import { StaticGenderDataResModel } from "../../../auth-register-module/models/static-gender-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-editable-gender-input-box",
    templateUrl: "./editable-gender-input-box.component.html",
    providers: [ NgFormsService, FormInputClassesConstants, StaticDataReqResService ],
})
export class EditableGenderInputBoxComponent implements OnInit, OnDestroy {

    @Input() _genderValue!: SimpleDataTupleModel<string>;

    _genderFormGroup!: FormGroup;
    _staticGenderData!: StaticGenderDataResModel;
    _suspenseLoader: boolean = false;
    _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        public _cssConstants: FormInputClassesConstants,
        private _reqResService: StaticDataReqResService,
    ) {
        this._genderFormGroup = new FormGroup({
            gender: new FormControl(null, [ Validators.required ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeObservable(this._reqResService.getGenderData(), this._ngUnsubscribe,
            data => this._staticGenderData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSetDefaultValues(): void {
        this._genderFormGroup.reset();
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage === "") return;
        this._serverResponse = new SimpleMessageResWithErrorModel("", false);
    };

    handleCloseValueBoxAndSaveChanges(): void {
        const data = this._ngFormsService.extractFormFields<GenderFormModel>(this._genderFormGroup);
        console.log('sending data...', data);
    };

    handleCloseValueBoxAndRemove(): void {
        console.log('removing data...');
    };
}
