/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: last-logins.component.ts
 * Last modified: 08/09/2022, 16:48
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

import { Component } from "@angular/core";

import { SaveUserLoginStorageService } from "../../services/save-user-login-storage.service";
import { UserLoginDetailsStorageModel } from "../../models/user-login-details-storage.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-last-logins",
    templateUrl: "./last-logins.component.html",
    styleUrls: [ "./last-logins.component.scss" ],
    providers: [ SaveUserLoginStorageService ],
})
export class LastLoginsComponent {

    _rememberAccounts: Array<UserLoginDetailsStorageModel> = this._storage.getAllSavedUserDetailsFromLocalStorage();

    constructor(
        private _storage: SaveUserLoginStorageService,
    ) {
    };

    handleRemoveAllRememberAccounts(): void {
        this._storage.removeAllUsersFromLocalStorage();
    };

    handleRemoveSingleSavedUserAccount(userId: number): void {
        this._storage.removeSingleUserDetailsFromLocalStorage(userId);
    };
}
