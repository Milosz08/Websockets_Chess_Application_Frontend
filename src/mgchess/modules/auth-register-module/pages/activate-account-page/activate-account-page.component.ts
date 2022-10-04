/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: activate-account-page.component.ts
 * Last modified: 23/09/2022, 20:27
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
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { AuthReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import * as NgrxAction_ATH from "../../ngrx-store/auth-ngrx-store/auth.actions";
import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-activate-account-page",
    templateUrl: "./activate-account-page.component.html",
    styleUrls: [ "./activate-account-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container remove-margin__small-devices" },
})
export class ActivateAccountPageComponent extends BrowserMetaSerializatorLoader implements OnInit, OnDestroy {

    _jwtToken: string = "";
    _serverResponse!: SimpleMessageResWithErrorModel;

    _isSuspenseActive$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_attemptToactivateAccountViaOta);
    _finishSignupServerResponse$: Observable<string> = this._store.select(NgrxSelector_ATH.sel_activateAccountServerResponse);

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _route: ActivatedRoute,
        private _store: Store<AuthReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.AUTH_REGISTER_MODULE, SinglePageType.ACTIVATE_ACCOUNT_PAGE);
    };

    ngOnInit(): void {
        this._store.dispatch(NgrxAction_ATH.__clearServerResponse());
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponse, this._ngUnsubscribe,
            data => this._serverResponse = data);
        this._jwtToken = String(this._route.snapshot.queryParamMap.get("token"));
        this._store.dispatch(NgrxAction_ATH.__attemptToAttemptActivateAccountViaOta({ jwtToken: this._jwtToken }));
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
