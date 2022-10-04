/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: validate-oauth2-user.service.ts
 * Last modified: 25/09/2022, 03:24
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
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { OAuthSupplier } from "../../../http-request-helpers/oauth2-request-endpoints.contants";

import { SessionWithAuthCombinedReducerTypes } from "../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_ATH from "../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxAction_SES from "../../shared-module/ngrx-store/session-ngrx-store/session.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ValidateOauth2UserService {

    _oauth2ResError: string = "";
    _oauth2ResToken: string = "";
    _oauth2ResSupplier: string = "";

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<SessionWithAuthCombinedReducerTypes>,
    ) {
        this._oauth2ResError = this._route.snapshot.queryParamMap.get("error") || "";
        this._oauth2ResToken = this._route.snapshot.queryParamMap.get("token") || "";
        this._oauth2ResSupplier = this._route.snapshot.queryParamMap.get("supplier") || "";
    };

    validateFinishSignup(): void {
        this._store.dispatch(NgrxAction_ATH.__clearFinishSignupUserData());
        this._store.dispatch(NgrxAction_ATH.__attemptToAttemptFinishSignupViaOAuth2({ jwtToken: this._oauth2ResToken }));
    };

    validateLogin(): void {
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
        if (!Boolean(this._oauth2ResToken) || !Boolean(this._oauth2ResSupplier)) return;
        this._store.dispatch(NgrxAction_SES.__attemptToLoginViaOAuth2({ jwtToken: this._oauth2ResToken }));
    };

    get __isGoogleSupplierSuspenseActive(): boolean {
        return this._oauth2ResSupplier === OAuthSupplier.GOOGLE;
    };

    get __isFacebookSupplierSuspenseActive(): boolean {
        return this._oauth2ResSupplier === OAuthSupplier.FACEBOOK;
    };

    get __ifAnyQueryParamExist(): boolean {
        return !!this._oauth2ResToken || !!this._oauth2ResSupplier;
    };
}
