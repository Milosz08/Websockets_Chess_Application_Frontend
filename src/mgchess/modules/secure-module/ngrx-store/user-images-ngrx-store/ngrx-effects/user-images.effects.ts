/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-images.effects.ts
 * Last modified: 20.11.2022, 23:48
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

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { catchError, delay, map, mergeMap, of, tap } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { UserImagesWithGfxReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";
import { UserImagesHttpReqResService } from "../../../services/user-images-http-req-res.service";
import { GlobalSuspenseService } from "../../../../shared-module/services/global-suspense.service";

import * as NgrxAction_UIM from "../user-images.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxAction_SES from "../../../../shared-module/ngrx-store/session-ngrx-store/session.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UserImagesEffects {

    constructor(
        private _actions$: Actions,
        private _store: Store<UserImagesWithGfxReducerType>,
        private _suspenseService: GlobalSuspenseService,
        private _reqResService: UserImagesHttpReqResService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    updateUserProfileImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_UIM.__attemptToChangeUserProfileImage),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.CHANGE_USER_PROFILE_IMAGE }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(({ image }) => {
                return this._reqResService.changeUserProfileImage(image).pipe(
                    map(({ responseMessage, imageUrl }) => {
                        this._store.dispatch(NgrxAction_SES.__updateUserProfileImage({ imageUrl }));
                        this._store.dispatch(NgrxAction_GFX.__closeActionWindowModal());
                        return NgrxAction_UIM.__successfulSetUserImage({ responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_UIM.__failureSetUserImage({
                            responseMessage: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    deleteUserProfileImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_UIM.__attemptToDeleteUserProfileImage),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.DELETE_USER_PROFILE_IMAGE }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(() => {
                return this._reqResService.deleteUserProfileImage().pipe(
                    map(({ responseMessage, imageUrl }) => {
                        this._store.dispatch(NgrxAction_SES.__updateUserProfileImage({ imageUrl }));
                        this._store.dispatch(NgrxAction_GFX.__closeActionWindowModal());
                        return NgrxAction_UIM.__successfulSetUserImage({ responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_UIM.__failureSetUserImage({
                            responseMessage: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    updateUserBannerImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_UIM.__attemptToChangeUserBannerImage),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.CHANGE_USER_BANNER_IMAGE }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(({ image }) => {
                return this._reqResService.changeUserBannerImage(image).pipe(
                    map(({ responseMessage, imageUrl }) => {
                        this._store.dispatch(NgrxAction_SES.__updateUserBannerImage({ imageUrl }));
                        this._store.dispatch(NgrxAction_GFX.__closeActionWindowModal());
                        return NgrxAction_UIM.__successfulSetUserImage({ responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_UIM.__failureSetUserImage({
                            responseMessage: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    deleteUserBannerImage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_UIM.__attemptToDeleteUserBannerImage),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.DELETE_USER_BANNER_IMAGE }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(() => {
                return this._reqResService.deleteUserBannerImage().pipe(
                    map(({ responseMessage }) => {
                        this._store.dispatch(NgrxAction_SES.__updateUserBannerImage({ imageUrl: "" }));
                        this._store.dispatch(NgrxAction_GFX.__closeActionWindowModal());
                        return NgrxAction_UIM.__successfulSetUserImage({ responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_UIM.__failureSetUserImage({
                            responseMessage: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });
}
