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

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { catchError, delay, map, mergeMap, of, tap } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { SessionReqResService } from "../../../services/session-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";

import * as NgrxAction_SES from "../session.actions";
import * as NgrxAction_GFX from "../../gfx-ngrx-store/gfx.actions";
import { LoginReqModel } from "../ngrx-models/login-data-req.model";
import { SessionWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class LoginEffects {

    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _httpService: SessionReqResService,
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
                            // TODO: add saving account implementation
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
            mergeMap(({ req, jwtToken }) => {
                return this._httpService.loginViaOAuth2(req, jwtToken).pipe(
                    map(credentialsData => {
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

    redirectToStartOnSuccessfulLogin$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successfulLogin),
            tap(() => {
                this._router.navigate([ "/" ]).then(r => r);
            }),
        );
    }, { dispatch: false });
}
