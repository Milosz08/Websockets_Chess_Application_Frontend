/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-banner-with-avatar-account.component.ts
 * Last modified: 13.11.2022, 18:12
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

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SessionReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_SES from '../../ngrx-store/session-ngrx-store/session.selectors';

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-user-banner-with-avatar-account",
    templateUrl: "./user-banner-with-avatar-account.component.html",
    styleUrls: [ "./user-banner-with-avatar-account.component.scss" ],
})
export class UserBannerWithAvatarAccountComponent implements OnInit, OnDestroy {

    @Input() _userProfileUrl: string = "";
    @Input() _userBannerUrl: string = "";

    _isNotLogged: boolean = true;
    _credentialsSupplier: string = "";
    _isLocalSupplier: boolean = true;

    private _alphaMask: string = "var(--half-transparent-tint-dark-color)";
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<SessionReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userIsNotLogged, this._ngUnsubscribe,
            data => this._isNotLogged = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_supplierIsLocal, this._ngUnsubscribe,
            data => this._isLocalSupplier = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userLoggedData, this._ngUnsubscribe,
            data => this._credentialsSupplier = data.credentialsSupplier);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleOpenChangeBannerImageModal(): void {
        // TODO: open change banner image modal
    };

    handleOpenChangeProfileImageModal(): void {
        // TODO: open change profile image modal
    };

    get __supplierImagePath(): string {
        return `assets/gfx/images/oauth2-${this._credentialsSupplier}-logo.svg`;
    };

    get __bannerImageUrl(): string {
        if (this._userBannerUrl !== "") {
            return `linear-gradient(${this._alphaMask}, ${this._alphaMask}), url("${this._userBannerUrl}") center`;
        }
        return "var(--primary-dark-color)"
    };

    get __profileImageUrl(): string {
        if (this._userProfileUrl !== "") {
            return `url("${this._userProfileUrl}") center`;
        }
        return "var(--primary-light-color)";
    };
}
