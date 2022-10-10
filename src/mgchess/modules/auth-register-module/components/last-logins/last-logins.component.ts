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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { catchError, delay, map, of, Subject, takeUntil } from "rxjs";
import { RxjsConstants } from "../../../../rxjs-helpers/rxjs.constants";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { StaticDataReqResService } from "../../services/static-data-req-res.service";
import { SaveUserLoginStorageService } from "../../services/save-user-login-storage.service";
import { UserLoginDetailsStorageModel } from "../../models/user-login-details-storage.model";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-last-logins",
    templateUrl: "./last-logins.component.html",
    styleUrls: [ "./last-logins.component.scss" ],
    providers: [ SaveUserLoginStorageService ],
})
export class LastLoginsComponent implements OnInit, OnDestroy {

    _suspenseLoader: boolean = false;
    _rememberAccounts: Array<UserLoginDetailsStorageModel> = new Array<UserLoginDetailsStorageModel>();

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<AuthReducerType>,
        private _storage: SaveUserLoginStorageService,
        private _staticDataReqResService: StaticDataReqResService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.getUserDetailsFromDatabase();
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleRemoveAllRememberAccounts(): void {
        this._storage.removeAllUsersFromLocalStorage();
        this.getUserDetailsFromDatabase();
    };

    handleInsertUserLoginIntoForm(userLogin: string): void {
        this._store.dispatch(NgrxAction_ATH.__filledInitialLoginInLoginForm({ userLogin }));
    };

    handleRemoveSingleSavedUserAccount(userId: number): void {
        this._storage.removeSingleUserDetailsFromLocalStorage(userId);
        this.getUserDetailsFromDatabase();
    };

    private getUserDetailsFromDatabase(): void {
        this._suspenseLoader = true;
        this._staticDataReqResService.getRememberAccountsData(this._storage.getAllSavedUserDetails()).pipe(
            takeUntil(this._ngUnsubscribe),
            delay(RxjsConstants.DEF_SUSPENSE_MILIS),
            map(data => data),
            catchError(() => {
                this._suspenseLoader = false;
                return of(new Array<UserLoginDetailsStorageModel>());
            }),
        ).subscribe(data => {
            this._suspenseLoader = false;
            this._rememberAccounts = data;
            if (this._rememberAccounts.length === 0) this._storage.removeAllUsersFromLocalStorage();
            this._rememberAccounts.forEach(account => this._storage.saveUserDetailsInLocalStorage(account));
        });
    };

    ngRememberAccountTitle(userDetails: UserLoginDetailsStorageModel): string {
        return `User: ${userDetails.fullName}. Click here to insert user login into login form.`;
    };
}
