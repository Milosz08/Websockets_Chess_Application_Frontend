/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: login.effects.ts
 * Last modified: 25/09/2022, 04:11
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

import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { catchError, delay, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { GfxEffects } from "../../gfx-ngrx-store/ngrx-effects/gfx.effects";
import { SessionReqResService } from "../../../services/session-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { SaveUserLoginStorageService } from "../../../../auth-register-module/services/save-user-login-storage.service";
import { UserLoginDetailsStorageModel } from "../../../../auth-register-module/models/user-login-details-storage.model";

import { sessionNgrxStore } from "../session.reducer";
import { LoginReqModel } from "../ngrx-models/login-data-req.model";
import { SessionWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_SES from "../session.actions";
import * as NgrxAction_GFX from "../../gfx-ngrx-store/gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class LoginEffects {

    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _httpService: SessionReqResService,
        @Inject(DOCUMENT) private _document: Document,
        private _storage: SaveUserLoginStorageService,
        private _store: Store<SessionWithGfxCombinedReducerTypes>,
    ) {
    };

    loginViaLocal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__attemptToLoginViaLocal),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_LOGIN_VIA_LOCAL }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(({ loginForm }) => {
                const req = LoginReqModel.factoryLoginRequstModelFromForm(loginForm);
                return this._httpService.loginViaLocal(req).pipe(
                    map(credentialsData => {
                        if (loginForm.rememberAccount) {
                            this._storage.saveUserDetailsInLocalStorage(new UserLoginDetailsStorageModel(credentialsData));
                        }
                        if (!credentialsData.activated) {
                            this._router.navigate([ "/auth/activate-account" ],
                                { queryParams: { token: credentialsData.jwtToken } }
                            ).then(r => r);
                        } else {
                            this._router.navigate([ "/" ]).then(r => r);
                        }
                        return NgrxAction_SES.__successfulLogin({ credentialsData });
                    }),
                    catchError(error => {
                        return of(NgrxAction_SES.__failureLogin({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    loginViaOAuth2$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__attemptToLoginViaOAuth2),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_LOGIN_VIA_OAUTH2 }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS * 2),
            mergeMap(({ jwtToken }) => {
                return this._httpService.loginViaOAuth2(jwtToken).pipe(
                    map(credentialsData => {
                        this._router.navigate([ "/" ]).then(r => r);
                        return NgrxAction_SES.__successfulLogin({ credentialsData });
                    }),
                    catchError(error => {
                        return of(NgrxAction_SES.__failureLogin({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    logout$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__attemptToLogout),
            withLatestFrom(this._store.select(sessionNgrxStore.reducerName)),
            tap(() => {
                this._document.body.classList.add(GfxEffects.SCROLL_DISABLED_CSS);
                this._store.dispatch(NgrxAction_GFX.__activeGlobalSuspense());
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(([ _, state ]) => {
                return this._httpService.logout(state.userCredentialsData!.jwtToken).pipe(
                    map(() => NgrxAction_SES.__successfulLogout()),
                    catchError(error => {
                        return of(NgrxAction_SES.__failureLogin({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._document.body.classList.remove(GfxEffects.SCROLL_DISABLED_CSS);
                this._store.dispatch(NgrxAction_GFX.__inactiveGlobalSuspense());
            }),
        );
    });

    finishLogoutProcedure$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successfulLogout),
            tap(() => {
                this._router.navigate([ "/" ]).then(r => r);
                // TODO: Remove saved account from local storage
            }),
        );
    }, { dispatch: false });
}
