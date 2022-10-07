/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: mgchess.component.ts
 * Last modified: 21/08/2022, 18:31
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

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { SessionReducerType } from "./ngrx-helpers/ngrx-store.types";
import { BrowserThemeDetector } from "./browster-utils/browser-theme.detector";
import { ColorThemeLocalStorageService } from "./services/color-theme-local-storage.service";

import * as NgrxAction_SES from "../mgchess/modules/shared-module/ngrx-store/session-ngrx-store/session.actions";
import { UserRememberStorageService } from "./modules/shared-module/services/user-remember-storage.service";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-root",
    templateUrl: "./mgchess.component.html",
    providers: [ ColorThemeLocalStorageService, UserRememberStorageService ],
})
export class MgchessComponent implements OnInit {

    constructor(
        private _store: Store<SessionReducerType>,
        private _storage: UserRememberStorageService,
        private _service: ColorThemeLocalStorageService,
    ) {
    };

    ngOnInit(): void {
        BrowserThemeDetector.detectBrowserThemeAndChangeFavicon();
        this._service.checkSavedColorThemeAndReturn();
        if (this._storage.checkIfUserIsNotLogged()) return;
        this._store.dispatch(NgrxAction_SES.__attemptToAutoLogin());
    };
}
