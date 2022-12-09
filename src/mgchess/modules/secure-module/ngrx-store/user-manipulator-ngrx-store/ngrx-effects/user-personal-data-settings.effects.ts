/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-personal-data-settings.effects.ts
 * Last modified: 08.12.2022, 22:59
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

import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { UserManipulatorWithGfxReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";
import { UserManipulatorHttpReqResService } from "../../../services/user-manipulator-http-req-res.service";

import * as NgrxAction_UMP from "../user-manipulator.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UserPersonalDataSettingsEffects {

    constructor(
        private _actions$: Actions,
        private _reqResService: UserManipulatorHttpReqResService,
        private _store: Store<UserManipulatorWithGfxReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    loadUserPersonalDataEffect$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_UMP.__attemptToLoadPersonalDataSettings),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.LOAD_USER_PERSONAL_SETTINGS_DATA }));
            }),
            delay(RxjsConstants.DEF_SHORT_DELAY_MILIS),
            mergeMap(() => {
                return this._reqResService.getUserPersonalSettingsData().pipe(
                    map(personalData => {
                        return NgrxAction_UMP.__successfulLoadPersonalDataSettings({ personalData });
                    }),
                    catchError(error => {
                        return of(NgrxAction_UMP.__failureLoadPersonalDataSettings({
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
