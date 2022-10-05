/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: logged-user-header-info.component.ts
 * Last modified: 05/10/2022, 20:01
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

import { FadeInOutAnimation } from "../../../../animations/fade.animation";

import { SessionReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.actions";
import * as NgrxSelector_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.selectors";
import { UserCredentialsDataResModel } from "../../../shared-module/ngrx-store/session-ngrx-store/ngrx-models/user-credentials-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-logged-user-header-info",
    templateUrl: "./logged-user-header-info.component.html",
    styleUrls: [ "./logged-user-header-info.component.scss" ],
    animations: [ FadeInOutAnimation ],
})
export class LoggedUserHeaderInfoComponent implements OnInit, OnDestroy {

    @Input() _isMobileHeader: boolean = false;

    _loggedUserData!: UserCredentialsDataResModel;
    _isPopupMenuOpen: boolean = false;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _store: Store<SessionReducerType>,
    ) {
    };

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userLoggedData, this._ngUnsubscribe,
                data => this._loggedUserData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleToggleUserDetailsPopupMenu(): void {
        this._isPopupMenuOpen = !this._isPopupMenuOpen;
    };

    handleCloseUserDetailsPopupMenu(): void {
        this._isPopupMenuOpen = false;
    };

    handleLogoutFromSystem(): void {
        this._store.dispatch(NgrxAction_SES.__attemptToLogout());
    };
}
