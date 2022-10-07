/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 *  File name: save-user-login-storage.service.ts
 *  Last modified: 07/10/2022, 11:46
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
import { UserLoginDetailsStorageModel } from "../models/user-login-details-storage.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable({ providedIn: "root" })
export class SaveUserLoginStorageService {

    private readonly _localStorage: Storage = this._DOCUMENT.defaultView!.localStorage;
    private readonly _storageKey: string = "SAVED_USERS_DETAILS";

    constructor(
        @Inject(DOCUMENT) private _DOCUMENT: Document,
        private _storageHelper: StorageHelper,
    ) {
    };

    saveUserDetailsInLocalStorage(userDetails: UserLoginDetailsStorageModel): void {
        const allUsersDetails = this.getAllUsersDetailsFromLocalStorage();
        allUsersDetails.push(userDetails);
        this._storageHelper.updateStorageItem(this._storageKey, allUsersDetails);
    };

    getAllSavedUserDetailsFromLocalStorage(): Array<UserLoginDetailsStorageModel> {
        return this.getAllUsersDetailsFromLocalStorage();
    };

    removeSingleUserDetailsFromLocalStorage(userId: number): void {
        const allUsers = this.getAllUsersDetailsFromLocalStorage();
        const allUsersWithoutRemoved = allUsers.filter(u => u.userId !== userId);
        this._storageHelper.updateStorageItem(this._storageKey, allUsersWithoutRemoved);
    };

    removeAllUsersFromLocalStorage(): void {
        this._localStorage.removeItem(this._storageKey);
    };

    private getAllUsersDetailsFromLocalStorage(): Array<UserLoginDetailsStorageModel> {
        const allUserDetailsBefParse: string | null = this._localStorage.getItem(this._storageKey);
        if (allUserDetailsBefParse == null) {
            return new Array<UserLoginDetailsStorageModel>();
        }
        return JSON.parse(allUserDetailsBefParse);
    };
}
