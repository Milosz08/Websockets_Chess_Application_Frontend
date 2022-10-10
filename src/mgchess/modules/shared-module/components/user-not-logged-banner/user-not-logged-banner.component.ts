/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 *  File name: user-not-logged-banner.component.ts
 *  Last modified: 06/10/2022, 09:54
 *  Project name: chess-app-frontend
 *
 *  Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL
 *  COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 */

import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { SessionReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_SES from "../../ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: 'mgchess-user-not-logged-banner',
    templateUrl: './user-not-logged-banner.component.html',
    styleUrls: ['./user-not-logged-banner.component.scss'],
})
export class UserNotLoggedBannerComponent {

    _isForcedBannerClosed: boolean = false;
    _isNotLogged$: Observable<boolean> = this._store.select(NgrxSelector_SES.sel_userIsNotLogged);

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<SessionReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    handleForceCloseNotLoggedBanner(): void {
        this._isForcedBannerClosed = true;
    };
}
