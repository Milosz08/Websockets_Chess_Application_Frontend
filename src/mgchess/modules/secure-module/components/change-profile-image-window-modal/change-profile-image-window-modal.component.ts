/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-profile-image-window-modal.component.ts
 * Last modified: 19.11.2022, 18:06
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SessionWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";
import { ModalWindowType } from "../../../shared-module/ngrx-store/gfx-ngrx-store/ngrx-models/action-window-modal.model";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxSelector_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-change-profile-image-window-modal",
    templateUrl: "./change-profile-image-window-modal.component.html",
    styleUrls: [ "./change-profile-image-window-modal.component.scss" ],
})
export class ChangeProfileImageWindowModalComponent implements OnInit, OnDestroy {

    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_changeUserProfileImageSuspense);
    _suspenseDeleteLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_deleteUserProfileImageSuspense);

    _userProfileImageUrl: string = "";
    _errorResponse: string = "";
    _modalType: ModalWindowType = ModalWindowType.CHANGE_PROFILE_IMAGE;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<SessionWithGfxCombinedReducerTypes>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userProfileImage, this._ngUnsubscribe,
            data => this._userProfileImageUrl = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleChangeProfileImageAndCloseModal(): void {
        // TODO: set user profile image
    };

    handleRemoveProfileImageAndCloseModal(): void {
        // TODO: remove user profile image (generate default)
    };
}
