/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup.effects.ts
 * Last modified: 16/09/2022, 18:01
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

import { catchError, delay, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { AuthReqResService } from "../../../services/auth-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";

import { authNgrxStore } from "../auth.reducer";
import { SignupReqModel } from "../ngrx-models/signup-req.model";
import { FinishSignupReqModel } from "../ngrx-models/finish-signup-req.model";
import { AuthWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_ATH from "../auth.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions"

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class SignupEffects {

    constructor(
        private _actions$: Actions,
        private _httpService: AuthReqResService,
        private _store: Store<AuthWithGfxCombinedReducerTypes>,
    ) {
    };

    singupViaLocal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_ATH.__attemptToSingUpViaLocal),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_SIGNUP_VIA_LOCAL }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(({ signupForm }) => {
                const req = new SignupReqModel(signupForm);
                return this._httpService.signupViaLocal(req).pipe(
                    map(({ responseMessage }) => {
                        return NgrxAction_ATH.__successfulSingUpViaLocal({ serverResponse: responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_ATH.__failureSingUpViaLocal({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    attemptToFinishSignupViaOAuth2 = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_ATH.__attemptToAttemptFinishSignupViaOAuth2),
            tap(({ req, jwtToken }) => {
                this._store.dispatch(NgrxAction_ATH.__filledFinishSignupJwtToken({ jwtToken }));
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(({ req, jwtToken }) => {
                return this._httpService.attemptToFinishSignupViaOAuth2(req, jwtToken).pipe(
                    map(res => {
                        if (res.dataFilled) {
                            this._store.dispatch(NgrxAction_ATH.__filledFinishSignupResponseMessage({
                                serverResponse: res.responseMessage }));
                        }
                        return NgrxAction_ATH.__successfulAttemptFinishSignupViaOAuth2({ finishAccountDetails: res });
                    }),
                    catchError(error => {
                        return of(NgrxAction_ATH.__failureAttemptFinishSignupViaOAuth2({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    finishSignupViaOAuth2 = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_ATH.__attemptToFinishSignupViaOAuth2),
            withLatestFrom(this._store.select(authNgrxStore.reducerName)),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.FINISH_SIGNUP_VIA_OAUTH2 }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(([ action, state ]) => {
                const req = new FinishSignupReqModel(action.finishSignupForm);
                return this._httpService.finishSignupViaOAuth2(req, state.finishSignupJwtToken).pipe(
                    map(({ responseMessage }) => {
                        return NgrxAction_ATH.__successfulFinishSignupViaOAuth2({ serverResponse: responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_ATH.__failureFinishSignupViaOAuth2({
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
