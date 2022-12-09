/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: editable-scaffold-box.component.ts
 * Last modified: 07.12.2022, 15:57
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

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-editable-scaffold-box",
    templateUrl: "./editable-scaffold-box.component.html",
    styleUrls: [ "./editable-scaffold-box.component.scss" ],
})
export class EditableScaffoldBoxComponent implements OnInit {

    @Input() _formGroup!: FormGroup;
    @Input() _editableValue: string = "";
    @Input() _showedStaticValue: string = "";
    @Input() _descriptionLabel: string = "";
    @Input() _removeButtonVisible: boolean = true;
    @Input() _suspenseLoader: boolean = false;
    @Input() _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    @Output() _emitOpenBox: EventEmitter<void> = new EventEmitter<void>();
    @Output() _emitNewValue: EventEmitter<void> = new EventEmitter<void>();
    @Output() _emitRemoveValue: EventEmitter<void> = new EventEmitter<void>();

    _inputBoxVisible: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        if (!Boolean(this._showedStaticValue)) this._showedStaticValue = this._editableValue;
    };

    handleOpenValueBox(): void {
        this._inputBoxVisible = true;
        this._emitOpenBox.emit();
    };

    handleCloseValueBox(): void {
        this._inputBoxVisible = false;
    };

    handleCloseValueBoxAndSaveChanges(): void {
        this.handleCloseValueBox();
        this._emitNewValue.emit();
    };

    handleCloseValueBoxAndRemove(): void {
        this.handleCloseValueBox();
        this._emitRemoveValue.emit();
    };
}
