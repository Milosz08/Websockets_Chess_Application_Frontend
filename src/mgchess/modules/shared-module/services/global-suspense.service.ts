/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: global-suspense.service.ts
 * Last modified: 16/09/2022, 17:40
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

import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { GlobalReducerType } from "../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_GLB from "../ngrx-store/global-ngrx-store/global.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class GlobalSuspenseService {

    constructor(
        private _router: Router,
        private _store: Store<GlobalReducerType>,
    ) {
    };

    toggleSuspenseLoaderComponent(): void {
        this._router.events.subscribe(e => {
            if (e instanceof RouteConfigLoadStart) {
                this._store.dispatch(NgrxAction_GLB.__setSuspenseLoadingStatusActive());
            } else if (e instanceof RouteConfigLoadEnd) {
                this._store.dispatch(NgrxAction_GLB.__setSuspenseLoadingPrependInactive());
            }
        });
    };

    removeQueryParams(queryParamName: string): void {
        this._router.navigate([], {
            queryParams: {
                [queryParamName]: null
            },
            queryParamsHandling: "merge"
        }).then(r => r);
    };
}
