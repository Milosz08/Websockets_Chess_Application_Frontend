/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: login-helper.effects.ts
 * Last modified: 07/10/2022, 18:33
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

import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";

import { SessionReqResService } from "../../../services/session-req-res.service";
import { UserRememberStorageService } from "../../../services/user-remember-storage.service";

import * as NgrxAction_SES from "../session.actions";
import { sessionNgrxStore } from "../session.reducer";
import { SessionReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";
import { AutoLoginUserStorageModel } from "../ngrx-models/auto-login-user-req.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class LoginHelperEffects {

    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _store: Store<SessionReducerType>,
        private _httpService: SessionReqResService,
        private _storageAutoLogin: UserRememberStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    refreshToken$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__attemptToRefreshToken),
            withLatestFrom(this._store.select(sessionNgrxStore.reducerName)),
            mergeMap(([ _, state ]) => {
                return this._httpService.refreshToken(state.userCredentialsData!.refreshToken).pipe(
                    map(refreshedData => {
                        const { token, refreshToken } = refreshedData;
                        const userCredentials = new AutoLoginUserStorageModel(refreshToken, token);
                        this._storageAutoLogin.saveLoggedUserRefreshTokenInLocalStorage(userCredentials);
                        return NgrxAction_SES.__successfulRefreshToken({ refreshedData });
                    }),
                    catchError(error => {
                        return of(NgrxAction_SES.__failureRefreshToken({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    finishLoginProcedure$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successfulLogin),
            tap(({ credentialsData }) => {
                const { jwtToken, refreshToken } = credentialsData;
                const storageTokens = new AutoLoginUserStorageModel(refreshToken, jwtToken);
                this._storageAutoLogin.saveLoggedUserRefreshTokenInLocalStorage(storageTokens);
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    finishLogoutProcedure$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SES.__successfulLogout),
            tap(() => {
                this._storageAutoLogin.removeSavedUserAccount();
                this._router.navigate([ "/" ]).then(r => r);
            }),
        );
    }, { dispatch: false });

}
