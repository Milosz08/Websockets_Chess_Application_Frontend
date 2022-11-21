/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: universal-change-user-image-modal.component.ts
 * Last modified: 21.11.2022, 01:54
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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { UserImageSuspenseModel } from "../../models/user-image-suspense.model";
import { UserImageUploadDetailsModel } from "../../models/user-image-upload-details.model";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import { UserImagesWithSessionWithGfxReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { ModalWindowType } from "../../../shared-module/ngrx-store/gfx-ngrx-store/ngrx-models/action-window-modal.model";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_UIM from "../../ngrx-store/user-images-ngrx-store/user-images.actions";
import * as NgrxSelector_UIM from "../../ngrx-store/user-images-ngrx-store/user-images.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-universal-change-user-image-modal",
    templateUrl: "./universal-change-user-image-modal.component.html",
})
export class UniversalChangeUserImageModalComponent implements OnInit, OnDestroy {

    @Input() _modalType: ModalWindowType = ModalWindowType.MODAL_INACTIVE;
    @Input() _suspenseLoaders!: UserImageSuspenseModel;
    @Input() _uploadDetails!: UserImageUploadDetailsModel;

    @Output() _emitActionOnSaveImage: EventEmitter<File> = new EventEmitter<File>();
    @Output() _emitActionOnRemoveImage: EventEmitter<void> = new EventEmitter<void>();

    _suspenseLoader$!: Observable<boolean>;
    _suspenseDeleteLoader$!: Observable<boolean>;

    _multipartFileData!: File;
    _submitImageButtonDisabled: boolean = true;
    _serverMessage!: SimpleMessageResWithErrorModel;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<UserImagesWithSessionWithGfxReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        const { add, remove } = this._suspenseLoaders;
        this._suspenseLoader$ = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(add));
        this._suspenseDeleteLoader$ = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(remove));
        RxjsHelper.subscribeData(this._store, NgrxSelector_UIM.sel_serverResponse, this._ngUnsubscribe,
            data => this._serverMessage = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleInactiveSubmitImageButton(): void {
        this._submitImageButtonDisabled = true;
    };

    handleSaveUploadedProfileImage(file: File): void {
        this._multipartFileData = file;
        this._submitImageButtonDisabled = false;
    };

    handleCleanupOnCloseModal(): void {
        this._store.dispatch(NgrxAction_UIM.__clearServerResponse());
    };

    handleChangeImageAndCloseModal(): void {
        if (!Boolean(this._multipartFileData)) return;
        this._emitActionOnSaveImage.emit(this._multipartFileData);
    };

    handleRemoveImageAndCloseModal(): void {
        this._emitActionOnRemoveImage.emit();
    };
}
