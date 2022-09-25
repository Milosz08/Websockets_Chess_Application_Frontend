/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: single-choice-box-input.component.ts
 * Last modified: 15/09/2022, 00:57
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

import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Subject, takeUntil } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { FormInputClassesModel } from "../../../../models/form-input-classes.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { SimpleDataTupleModel, TupleIdType } from "../../../../models/simple-data-tuple.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-single-choice-box-input",
    templateUrl: "./single-choice-box-input.component.html",
})
export class SingleChoiceBoxInputComponent implements OnChanges, OnDestroy {

    @Input() _formGroup!: FormGroup;
    @Input() _formControlName: string = "";
    @Input() _topInfoLabel: string = "";
    @Input() _selectItemLabel: string = "";
    @Input() _errorTextLabel: string = "Please select a value other than the default.";
    @Input() _choiceElements: Array<SimpleDataTupleModel<number | string>> = [];
    @Input() _cssClasses: FormInputClassesModel = new FormInputClassesModel("", "", "");

    @Output() _emitClearServerResponse: EventEmitter<void> = new EventEmitter<void>();

    private _ngUnsubsribe: Subject<void> = new Subject<void>();
    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();

    _isVisible: boolean = false;
    _initialLabelText: string = "";
    _itemListWithDef: Array<SimpleDataTupleModel<TupleIdType>> = [];
    _selectedItemName: string = this._initialLabelText;

    ngOnChanges(): void {
        this._initialLabelText = this._selectItemLabel !== "" ? this._selectItemLabel : "Click to select value";
        this._selectedItemName = this._initialLabelText;
        this._itemListWithDef = [...this._choiceElements];
        this._itemListWithDef.unshift(new SimpleDataTupleModel(this._selectedItemName, this._selectedItemName));
        this.synchronizedDataWithForm();
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubsribe);
    };

    synchronizedDataWithForm(): void {
        const field = this._formHelper.field(this._formControlName, this._formGroup);
        field.valueChanges.pipe(takeUntil(this._ngUnsubsribe)).subscribe(fieldData => {
            if (fieldData === null) this._selectedItemName = this._initialLabelText;
        });
    };

    handleToggleComboBoxList(): void {
        this._isVisible = !this._isVisible;
    };

    handleCloseComboBox(): void {
        this._isVisible = false;
    };

    handleFilledUpWithClickedComboBoxData(clickedItem: SimpleDataTupleModel<TupleIdType>): void {
        this._selectedItemName = clickedItem.value;
        this._formHelper.field(this._formControlName, this._formGroup).patchValue(clickedItem.id);
        this._isVisible = false;
    };

    get __fieldHasErrors(): boolean {
        return this._formHelper.field(this._formControlName, this._formGroup).value !== null
            && this._selectedItemName === this._initialLabelText;
    };
}
