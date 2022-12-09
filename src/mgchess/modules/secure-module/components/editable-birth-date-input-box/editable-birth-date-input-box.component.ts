/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: editable-born-date-input-box.component.ts
 * Last modified: 08.12.2022, 00:50
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
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { UserBirthDateModel } from "../../models/user-personal-data-res.model";
import { NgFormsService } from "../../../shared-module/services/ng-forms.service";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { FormInputClassesConstants } from "../../../../misc-constants/form-input-classes.constants";
import { StaticDataReqResService } from "../../../shared-module/services/static-data-req-res.service";
import { StaticCalendarDataResModel } from "../../../auth-register-module/models/static-calendar-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-editable-birth-date-input-box",
    templateUrl: "./editable-birth-date-input-box.component.html",
    providers: [ NgFormsService, FormInputClassesConstants, StaticDataReqResService ],
})
export class EditableBirthDateInputBoxComponent implements OnChanges, OnDestroy {

    @Input() _birthDateValue!: UserBirthDateModel;

    _birthDateFormGroup!: FormGroup;
    _suspenseLoader: boolean = false;
    _staticCalendarData!: StaticCalendarDataResModel;
    _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        public _cssConstants: FormInputClassesConstants,
        private _reqResService: StaticDataReqResService,
    ) {
        this._birthDateFormGroup = new FormGroup({
            birthDateDay: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(31) ]),
            birthDateMonth: new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(12) ]),
            birthDateYear: new FormControl(null, [ Validators.required, Validators.min(1900) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
        RxjsHelper.subscribeObservable(this._reqResService.getCalendarData(), this._ngUnsubscribe,
            data => this._staticCalendarData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleSetDefaultValues(): void {
        this._birthDateFormGroup.reset();
    };

    handleClearServerResponse(): void {
        if (this._serverResponse.responseMessage === "") return;
        this._serverResponse = new SimpleMessageResWithErrorModel("", false);
    };

    handleCloseValueBoxAndSaveChanges(): void {
        const data = this._ngFormsService.extractFormFields<UserBirthDateModel>(this._birthDateFormGroup);
        console.log('sending data...', data);
    };

    handleCloseValueBoxAndRemove(): void {
        console.log('removing data...');
    };
}
