/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: my-account-page.component.ts
 * Last modified: 22.11.2022, 18:01
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

import { NavigationLinksWithIconsModel } from "../../../../models/navigation-links-with-icons.model";
import * as NAVIGATION_LINKS from "../../../../../assets/static-data/secure-user-panel-navigation-links.json";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { SessionReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { UserCredentialsDataResModel } from "../../../shared-module/ngrx-store/session-ngrx-store/ngrx-models/user-credentials-data-res.model";

import * as NgrxSelector_SES from "../../../shared-module/ngrx-store/session-ngrx-store/session.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-my-account-page",
    templateUrl: "./my-account-page.component.html",
    styleUrls: [ "./my-account-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container" },
})
export class MyAccountPageComponent extends BrowserMetaSerializatorLoader implements OnInit, OnDestroy {

    _userLoggedData!: UserCredentialsDataResModel;
    readonly _navigationLinks: Array<NavigationLinksWithIconsModel>;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<SessionReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.SECURED_MODULE, SinglePageType.MY_ACCOUNT_PAGE);
        this._navigationLinks = (NAVIGATION_LINKS as any).default;
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_SES.sel_userLoggedData, this._ngUnsubscribe,
            data => this._userLoggedData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
