/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: upload-image-zone-box.component.ts
 * Last modified: 20.11.2022, 15:14
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

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";

import { UserImagesReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import * as NgrxAction_UIM from "../../ngrx-store/user-images-ngrx-store/user-images.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-upload-image-box",
    templateUrl: "./upload-image-zone-box.component.html",
    styleUrls: [ "./upload-image-zone-box.component.scss" ],
})
export class UploadImageZoneBoxComponent {

    @Input() _imageTypeText: string = "";
    @Input() _maxSizeMb: number = 5;
    @Input() _customPreviewImageCssClass: string = "";
    @Input() _availableExtensions: Array<string> = [ "jpeg", "png", "jpg" ];

    @ViewChild("imageDropRef", { static: false }) _imageDropEl!: ElementRef;
    @ViewChild("imagePreviewRef", { static: false }) _imagePreviewEl!: ElementRef;

    @Output() _emitDropImage: EventEmitter<File> = new EventEmitter<File>();
    @Output() _emitRemoveImage: EventEmitter<void> = new EventEmitter<void>();

    _imagePreviewIsUploaded: boolean = false;
    _errorResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    private _uploadedImage!: File;

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<UserImagesReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    handleGrabbedDroppedImage(files: FileList): void {
        this.uploadSendImage(files[0]);
    };

    handleFileBrowserUploader(e: Event): void {
        if (!((e.target as HTMLInputElement).files)) return;
        this.uploadSendImage((e.target as HTMLInputElement).files![0]);
    };

    handleRemovePreviewImage(): void {
        this._store.dispatch(NgrxAction_UIM.__clearServerResponse());
        this._imagePreviewEl.nativeElement.value = "";
        this._imagePreviewIsUploaded = false;
        this._emitRemoveImage.emit();
    };

    private uploadSendImage(uploadedImage: File): void {
        this._errorResponse = new SimpleMessageResWithErrorModel("", false);
        this._store.dispatch(NgrxAction_UIM.__clearServerResponse());
        if (uploadedImage.size > this._maxSizeMb * Math.pow(1024, 2)) {
            this.onUploadError(`File is too large. Maximum file size is ${this._maxSizeMb} MB.`);
            return;
        }
        if (!this._availableExtensions.some(el => uploadedImage.type === `image/${el}`)) {
            const extensionsString = this._availableExtensions.join(", ");
            this.onUploadError(`File has not acceptable extension. Available extensions: ${extensionsString}.`);
            return;
        }
        this._uploadedImage = uploadedImage;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const parts = (reader.result as string).split(';base64,');
            const decodedData = window.atob(parts[1]);
            const uInt8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                uInt8Array[i] = decodedData.charCodeAt(i);
            }
            const imageUrl = window.URL.createObjectURL(new Blob([uInt8Array], { type: parts[0].split(':')[1] }));
            this._imagePreviewEl.nativeElement.style.backgroundImage = `url(${imageUrl})`;
        });
        this._imagePreviewIsUploaded = true;
        reader.readAsDataURL(uploadedImage);
        this._emitDropImage.emit(uploadedImage);
    };

    private onUploadError(message: string) {
        this._errorResponse = new SimpleMessageResWithErrorModel(message, true);
        this._imageDropEl.nativeElement.value = "";
    };
}
