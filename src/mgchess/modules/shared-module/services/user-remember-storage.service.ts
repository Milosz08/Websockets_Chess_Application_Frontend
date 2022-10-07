/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 *  File name: user-remember-storage.service.ts
 *  Last modified: 07/10/2022, 11:41
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

import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { StorageHelper } from "../../../../storage/storage.helper";
import { AutoLoginUserStorageModel } from "../ngrx-store/session-ngrx-store/ngrx-models/auto-login-user-req.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UserRememberStorageService {

    private readonly _localStorage: Storage = this._DOCUMENT.defaultView!.localStorage;
    private readonly _storageKey: string = "SAVED_USER_LOGIN";

    constructor(
        private _storageHelper: StorageHelper,
        @Inject(DOCUMENT) private _DOCUMENT: Document,
    ) {
    };

    saveLoggedUserRefreshTokenInLocalStorage(userCredentials: AutoLoginUserStorageModel): void {
        this._storageHelper.updateStorageItem(this._storageKey, userCredentials);
    };

    checkIfUserIsNotLogged(): boolean {
        return this.getUserRefreshTokenFromLocalStorage().refreshToken === "";
    };

    removeSavedUserAccount(): void {
        this._localStorage.removeItem(this._storageKey);
    };

    getUserRefreshTokenFromLocalStorage(): AutoLoginUserStorageModel {
        const refreshTokenBeforeParse = this._localStorage.getItem(this._storageKey);
        if (refreshTokenBeforeParse == null) return new AutoLoginUserStorageModel("", "");
        return JSON.parse(refreshTokenBeforeParse);
    };

    getUserToken(): string {
        return this.getUserRefreshTokenFromLocalStorage().token;
    };

    getRefreshToken(): string {
        return this.getUserRefreshTokenFromLocalStorage().refreshToken;
    };
}
