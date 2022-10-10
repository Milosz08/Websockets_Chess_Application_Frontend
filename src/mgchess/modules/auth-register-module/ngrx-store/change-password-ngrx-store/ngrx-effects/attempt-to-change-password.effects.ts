/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: attempt-to-change-password.effects.ts
 * Last modified: 09/10/2022, 18:00
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
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { catchError, delay, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { ChangePasswordReqResService } from "../../../services/change-password-req-res.service";
import { OtaTokenNicknameEmailReqModel } from "../../../models/ota-token-mutliple-emails-req.model";

import { changePasswordNgrxStore } from "../change-password.reducer";
import { ChangePasswordWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";
import { ForgotPasswordMiddlewareDataModel } from "../ngrx-models/forgot-password-middleware-data.model";

import * as NgrxAction_CPA from "../change-password.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class AttemptToChangePasswordEffects {

    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _httpService: ChangePasswordReqResService,
        private _store: Store<ChangePasswordWithGfxCombinedReducerTypes>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    sendRequestToChangePassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_CPA.__attemptToSendRequestToChangePassword),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_CHANGE_PASSWORD }));
            }),
            mergeMap(action => {
                return this._httpService.sendRequestToChangePassword(action.usernameEmail).pipe(
                    map(res => {
                        const resDto = new ForgotPasswordMiddlewareDataModel(res.responseMessage, res.emailAddresses,
                            action.usernameEmail);
                        return NgrxAction_CPA.__successfulSendRequestToChangePassword({ serverResponse: resDto });
                    }),
                    catchError(error => {
                        return of(NgrxAction_CPA.__failureSendRequestToChangePassword({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    validateChangePasswordEmailViaOta$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_CPA.__attemptToValidateChangePasswordViaOta),
            withLatestFrom(this._store.select(changePasswordNgrxStore.reducerName)),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.VALIDATE_OTA_TOKEN_CHANGE_PASSWORD }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(([ action, store ]) => {
                const req = new OtaTokenNicknameEmailReqModel(action.otaToken, store.forgotPasswordResponse!.userNicknameEmail);
                return this._httpService.validateChangePasswordRequestViaOta(req).pipe(
                    map(res => {
                        return NgrxAction_CPA.__successfulValidateChangePasswordViaOta({ jwtToken: res.bearerToken });
                    }),
                    catchError(error => {
                        return of(NgrxAction_CPA.__failureValidateChangePasswordViaOta({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    redirectToChangePasswordAfterValidatedOtaToken$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_CPA.__successfulValidateChangePasswordViaOta),
            tap(({ jwtToken }) => {
                this._router.navigate(
                    [ "/auth/change-password" ],
                    { queryParams: { "token": jwtToken } },
                ).then(r => r);
            }),
        );
    }, { dispatch: false });
}
