/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-password.effects.ts
 * Last modified: 09/10/2022, 19:36
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

import { AuthReqResService } from "../../../services/auth-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";

import { ChangePasswordWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_CPA from "../change-password.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ChangePasswordEffects {

    constructor(
        private _actions$: Actions,
        private _httpService: AuthReqResService,
        private _store: Store<ChangePasswordWithGfxCombinedReducerTypes>,
    ) {
    };

    validateJwtTokenFromChangePasswordPage$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_CPA.__attemptToValidateJwtFromChangePassword),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.VALIDATE_JWT_TOKEN_CHANGE_PASSWORD }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(action => {
                return this._httpService.validateChangePasswordJwtAndReturnUserData(action.jwtToken).pipe(
                    map(userDetails => {
                        return NgrxAction_CPA.__successfulValidateJwtFromChangePassword({ userDetails });
                    }),
                    catchError(error => {
                        return of(NgrxAction_CPA.__failureValidateJwtFromChangePassword({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    changeForgottenPassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_CPA.__attemptToChangeForgottenPassword),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.CHANGE_FORGOTTER_PASSWORD }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(action => {
                return this._httpService.changeForgotterPassword(action.credentials, action.jwtToken).pipe(
                    map(({ responseMessage }) => {
                        return NgrxAction_CPA.__successfulChangeForgottenPassword({ serverResponse: responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_CPA.__failureChangeForgottenPassword({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });
}
