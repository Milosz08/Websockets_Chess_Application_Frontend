/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-via-local.effects.ts
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

import { catchError, delay, map, mergeMap, of, tap } from "rxjs";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { AuthReqResService } from "../../../services/auth-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";

import * as NgrxAction_ATH from "../auth.actions";
import { SignupReqModel } from "../ngrx-models/signup-req.model";
import { AuthReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class SignupViaLocalEffects {

    constructor(
        private _actions$: Actions,
        private _httpService: AuthReqResService,
        private _store: Store<AuthReducerType>,
    ) {
    };

    singupViaLocal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_ATH.__attemptToSingUpViaLocal),
            tap(() => {
                this._store.dispatch(NgrxAction_ATH.__activeSuspense({ for: SuspenseLoader.ATTEMPT_SIGNUP_VIA_LOCAL }));
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
                this._store.dispatch(NgrxAction_ATH.__disactiveSuspense());
            }),
        );
    });

}
