/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-profile-image-window-modal.component.ts
 * Last modified: 21.11.2022, 02:31
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

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { SuspenseLoader } from "../../../models/suspense-loader-res.model";
import { UserImageSuspenseModel } from "../models/user-image-suspense.model";
import { UserImageUploadDetailsModel } from "../models/user-image-upload-details.model";

import { UserImagesWithSessionWithGfxReducerType } from "../../../ngrx-helpers/ngrx-store.types";
import { ModalWindowType } from "../../shared-module/ngrx-store/gfx-ngrx-store/ngrx-models/action-window-modal.model";

import * as NgrxAction_UIM from "../ngrx-store/user-images-ngrx-store/user-images.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-change-profile-image-window-modal",
    template: `
        <mgchess-universal-change-user-image-modal
            [_modalType]="_modalType"
            [_suspenseLoaders]="_suspenses$"
            [_uploadDetails]="_uploadDetails"
            (_emitActionOnSaveImage)="handleUploadUserProfileImage($event)"
            (_emitActionOnRemoveImage)="handleRemoveUserProfileImage()"
        ></mgchess-universal-change-user-image-modal>
    `,
})
export class ChangeProfileImageWindowModalComponent {

    _suspenses$: UserImageSuspenseModel;
    _modalType: ModalWindowType = ModalWindowType.CHANGE_PROFILE_IMAGE;
    _uploadDetails: UserImageUploadDetailsModel = new UserImageUploadDetailsModel("profile", "200x200", "1:1");

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<UserImagesWithSessionWithGfxReducerType>,
    ) {
        const { CHANGE_USER_PROFILE_IMAGE, DELETE_USER_PROFILE_IMAGE } = SuspenseLoader;
        this._suspenses$ =  new UserImageSuspenseModel(CHANGE_USER_PROFILE_IMAGE, DELETE_USER_PROFILE_IMAGE);
    };

    //------------------------------------------------------------------------------------------------------------------

    handleUploadUserProfileImage(image: File): void {
        this._store.dispatch(NgrxAction_UIM.__attemptToChangeUserProfileImage({ image }));
    };

    handleRemoveUserProfileImage(): void {
        this._store.dispatch(NgrxAction_UIM.__attemptToDeleteUserProfileImage());
    };
}
