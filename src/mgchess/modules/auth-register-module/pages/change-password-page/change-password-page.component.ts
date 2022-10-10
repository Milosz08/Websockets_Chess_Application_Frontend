/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-password-page.component.ts
 * Last modified: 09/10/2022, 18:46
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

import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { ChangePasswordWithGfxCombinedReducerTypes } from "../../../../ngrx-helpers/ngrx-store.types";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.actions";
import * as NgrxSelector_CPA from "../../ngrx-store/change-password-ngrx-store/change-password.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-change-password-page",
    templateUrl: "./change-password-page.component.html",
    styleUrls: [ "./change-password-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container remove-margin__small-devices" },
})
export class ChangePasswordPageComponent extends BrowserMetaSerializatorLoader implements OnInit, OnDestroy {

    _bearerToken: string = "";
    _serverResponse!: SimpleMessageResWithErrorModel;

    _isForgotActive$: Observable<boolean> = this._store.select(NgrxSelector_CPA.sel_changePasswordResponseActive);
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.sel_validateChangePasswordJwtTokenSuspense);

    readonly _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _route: ActivatedRoute,
        private _store: Store<ChangePasswordWithGfxCombinedReducerTypes>,
    ) {
        super(_titleService, _metaService, SingleModuleType.AUTH_REGISTER_MODULE, SinglePageType.CHANGE_PASSWORD_PAGE);
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._bearerToken = String(this._route.snapshot.queryParamMap.get("token"));
        this._store.dispatch(NgrxAction_CPA.__attemptToValidateJwtFromChangePassword({ jwtToken: this._bearerToken }));
        RxjsHelper.subscribeData(this._store, NgrxSelector_CPA.sel_serverResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
