/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: my-account-page.component.ts
 * Last modified: 05/10/2022, 22:16
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
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { SessionReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { UserImagesModel } from "../../../shared-module/ngrx-store/session-ngrx-store/ngrx-models/user-credentials-data-res.model";

import * as NgrxSelector_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-my-account-page",
    templateUrl: "./my-account-page.component.html",
    host: { class: "mg-chess__flex-safety-container" },
})
export class MyAccountPageComponent extends BrowserMetaSerializatorLoader implements OnInit, OnDestroy {

    _userImagesUrls: UserImagesModel = new UserImagesModel("", "");

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<SessionReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.SECURED_MODULE, SinglePageType.MY_ACCOUNT_PAGE);
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userImages, this._ngUnsubscribe,
            data => this._userImagesUrls = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
