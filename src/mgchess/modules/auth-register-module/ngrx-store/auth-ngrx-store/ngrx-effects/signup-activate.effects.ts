/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: signup-activate.effects.ts
 * Last modified: 01/10/2022, 14:04
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
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";

import { AuthReqResService } from "../../../services/auth-req-res.service";
import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { OtaTokenMutlipleEmailsReqModel } from "../../../models/ota-token-mutliple-emails-req.model";

import { authNgrxStore } from "../auth.reducer";
import * as NgrxAction_ATH from "../auth.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";
import { AuthWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class SignupActivateEffects {

    constructor(
        private _actions$: Actions,
        private _httpService: AuthReqResService,
        private _store: Store<AuthWithGfxCombinedReducerTypes>,
    ) {
    };

    activateAccountViaOta = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_ATH.__attemptToActivateAccountViaOta),
            withLatestFrom(this._store.select(authNgrxStore.reducerName)),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ACTIVATE_ACCOUNT_VIA_OTA }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            mergeMap(([ action, state ]) => {
                const userEmail = state.finishSignupAccountDetails!.userEmailAddresses.map(e => e.normal);
                const req = new OtaTokenMutlipleEmailsReqModel(action.token, userEmail);
                return this._httpService.activateAccountViaOta(req).pipe(
                    map(({ responseMessage }) => {
                        return NgrxAction_ATH.__successfulActivateAccountViaOta({ serverResponse: responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_ATH.__failureActivateAccountViaOta({
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
