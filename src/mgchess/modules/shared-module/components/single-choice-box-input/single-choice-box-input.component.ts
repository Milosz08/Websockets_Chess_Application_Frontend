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

import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { ComboBoxType } from "../../types/combo-box.type";
import { FormInputClassesModel } from "../../../../models/form-input-classes.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { SimpleDataTupleModel, TupleIdType } from "../../../../models/simple-data-tuple.model";

import { GlobalReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_GLB from "../../ngrx-store/global-ngrx-store/global.actions";
import * as NgrxSelector_GLB from "../../ngrx-store/global-ngrx-store/global.selectors";
import { ComboListStateModel } from "../../ngrx-store/global-ngrx-store/ngrx-models/combo-list-state.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-single-choice-box-input",
    templateUrl: "./single-choice-box-input.component.html",
})
export class SingleChoiceBoxInputComponent implements OnInit, OnDestroy, OnChanges {

    @Input() _formGroup!: FormGroup;
    @Input() _formControlName: string = "";
    @Input() _topInfoLabel: string = "";
    @Input() _selectItemLabel: string = "";
    @Input() _errorTextLabel: string = "Please select a value other than the default.";
    @Input() _comboBoxType: ComboBoxType = ComboBoxType.NONE;
    @Input() _choiceElements: Array<SimpleDataTupleModel<number | string>> = [];
    @Input() _cssClasses: FormInputClassesModel = new FormInputClassesModel("", "", "");

    @Output() _emitClearServerResponse: EventEmitter<void> = new EventEmitter<void>();

    _comboBoxState!: ComboListStateModel;
    _comboBoxIsClosed!: boolean;
    readonly _formHelper: AngularFormsHelper = new AngularFormsHelper();
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    _isTouched: boolean = false;
    _initialLabelText: string = "";
    _itemListWithDef: Array<SimpleDataTupleModel<TupleIdType>> = [];
    _selectedItemName: string = this._initialLabelText;

    constructor(
        private _store: Store<GlobalReducerType>
    ) {
    };

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_GLB.sel_comboBoxState, this._ngUnsubscribe)
            .subscribe(data => this._comboBoxState = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_GLB.sel_comboBoxIsClose, this._ngUnsubscribe)
            .subscribe(data => this._comboBoxIsClosed = data);
    };

    ngOnChanges(): void {
        this._initialLabelText = this._selectItemLabel !== "" ? this._selectItemLabel : "Click to select value";
        this._selectedItemName = this._initialLabelText;
        this._itemListWithDef = [...this._choiceElements];
        this._itemListWithDef.unshift(new SimpleDataTupleModel(this._selectedItemName, this._selectedItemName));
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleShowItemList(e: Event): void {
        e.stopPropagation();
        this._store.dispatch(NgrxAction_GLB.__toggleComboList({ comboType: this._comboBoxType }));
        this._emitClearServerResponse.emit();
    };

    @HostListener("document:mouseup")
    handleHideItemList(): void {
        if (this._comboBoxIsClosed) return;
        console.log(this._comboBoxIsClosed);
        this._store.dispatch(NgrxAction_GLB.__closeComboList());
    };

    handleFilledUpWithClickedInputData(e: Event, clickedItem: SimpleDataTupleModel<TupleIdType>): void {
        this._selectedItemName = clickedItem.value;
        this._formHelper.field(this._formControlName, this._formGroup).patchValue(clickedItem.id);
        this._isTouched = true;
        if (this._comboBoxIsClosed) return;
        this._store.dispatch(NgrxAction_GLB.__closeComboList());
    };

    get __comboBoxState(): boolean {
        return this._comboBoxState.isOpen && this._comboBoxState.type === this._comboBoxType
            && this._comboBoxType !== ComboBoxType.NONE;
    };
}
