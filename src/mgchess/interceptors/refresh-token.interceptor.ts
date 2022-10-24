/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: refresh-token.interceptor.ts
 * Last modified: 07/10/2022, 18:01
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
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { catchError, Observable, switchMap, throwError } from "rxjs";
import { RxjsHelper } from "../rxjs-helpers/rxjs.helper";

import { SessionReqResService } from "../modules/shared-module/services/session-req-res.service";
import { UserRememberStorageService } from "../modules/shared-module/services/user-remember-storage.service";

import { SessionWithGfxCombinedReducerTypes } from "../ngrx-helpers/ngrx-store.types";
import { AutoLoginUserStorageModel } from "../modules/shared-module/ngrx-store/session-ngrx-store/ngrx-models/auto-login-user-req.model";

import * as NgrxAction_GFX from "../../mgchess/modules/shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxAction_SES from "../../mgchess/modules/shared-module/ngrx-store/session-ngrx-store/session.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    constructor(
        private _httpService: SessionReqResService,
        private _storageService: UserRememberStorageService,
        private _store: Store<SessionWithGfxCombinedReducerTypes>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        if (!Boolean(this._storageService.getUserToken())) {
            return next.handle(req);
        }
        const reqWithAuthHeader = RefreshTokenInterceptor.insertTokenHeader(req, this._storageService.getUserToken());
        return next.handle(reqWithAuthHeader).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    return this._httpService.refreshToken(this._storageService.getRefreshToken()).pipe(
                        switchMap(refreshedData => {
                            const { refreshToken, token } = refreshedData;
                            const userTokens = new AutoLoginUserStorageModel(refreshToken, token);
                            this._store.dispatch(NgrxAction_SES.__successfulRefreshToken({ refreshedData }));
                            this._storageService.saveLoggedUserRefreshTokenInLocalStorage(userTokens);
                            return next.handle(RefreshTokenInterceptor.insertTokenHeader(req, refreshedData.token));
                        }),
                        catchError(err => {
                            this._store.dispatch(NgrxAction_SES.__successfulLogout());
                            this._store.dispatch(NgrxAction_GFX.__openGlobalMessageModal({
                                message: RxjsHelper.serverResponseError(err), ifError: true }));
                            return throwError(err);
                        }),
                    );
                }
                return throwError(err);
            }),
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    private static insertTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ headers: req.headers.set("Authorization", `Bearer ${token}`) });
    };
}
