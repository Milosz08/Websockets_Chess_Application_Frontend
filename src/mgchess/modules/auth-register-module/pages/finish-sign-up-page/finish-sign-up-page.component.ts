/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: finish-sign-up-page.component.ts
 * Last modified: 25/09/2022, 01:52
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

import { Component, OnDestroy } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { ValidateOauth2UserService } from "../../services/validate-oauth2-user.service";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import * as NgrxSelector_ATH from "../../ngrx-store/auth-ngrx-store/auth.selectors";
import { AuthWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-finish-sign-up-page",
    templateUrl: "./finish-sign-up-page.component.html",
    styleUrls: [ "./finish-sign-up-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container remove-margin__small-devices" },
    providers: [ ValidateOauth2UserService ],
})
export class FinishSignUpPageComponent extends BrowserMetaSerializatorLoader implements OnDestroy {

    _oauth2SuspenseActive: boolean = false;
    _serverResponse!: SimpleMessageResWithErrorModel;

    _finishSignupUserPhoto$: Observable<string> = this._store.select(NgrxSelector_ATH.sel_finishSignupUserPhoto);
    _finishSignupUserSupplier$: Observable<string> = this._store.select(NgrxSelector_ATH.sel_finishSignupUserSupplier);
    _finishSignupUserFullName$: Observable<string> = this._store.select(NgrxSelector_ATH.sel_finishSignupUserFullName);
    _finishSignupUserInitials$: Observable<string> = this._store.select(NgrxSelector_ATH.sel_finishSignupUserInitials);

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<AuthWithGfxCombinedReducerTypes>,
        private _validateOAuth2Service: ValidateOauth2UserService,
    ) {
        super(_titleService, _metaService, SingleModuleType.AUTH_REGISTER_MODULE, SinglePageType.FINISH_SIGNUP_PAGE);
        this._validateOAuth2Service.validateFinishSignup();
        RxjsHelper.subscribeData(this._store, NgrxSelector_GFX.sel_finishSignupViaOAuth2Suspense, this._ngUnsubscribe)
            .subscribe(data => this._oauth2SuspenseActive = data);
        RxjsHelper.subscribeData(this._store, NgrxSelector_ATH.sel_serverResponse, this._ngUnsubscribe)
            .subscribe(data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
