/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: on-non-logged-redirect.guard.ts
 * Last modified: 05/10/2022, 22:36
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
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";

import { map, Observable } from "rxjs";

import { SessionReducerType } from "../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_SES from "../modules/shared-module/ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class OnNonLoggedRedirectGuard implements CanActivate {

    private readonly _isNotLogged$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_userIsNotLogged);

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _router: Router,
        private _store: Store<SessionReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._isNotLogged$.pipe(map(notLogged => {
            if (notLogged) this._router.navigate([ "/auth/login" ]).then(r => r);
            return true;
        }));
    };
}
