/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: unsubscribe-newsletter-page.component.ts
 * Last modified: 04/09/2022, 19:44
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

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { NewsletterReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_NWL from "../../ngrx-store/newsletter-ngrx-store/newsletter.actions";
import * as NgrxSelector_NWL from "../../ngrx-store/newsletter-ngrx-store/newsletter.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-unsubscribe-newsletter-via-email",
    templateUrl: "./unsubscribe-newsletter-page.component.html",
    styleUrls: [ "./unsubscribe-newsletter-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container" },
})
export class UnsubscribeNewsletterPageComponent extends BrowserMetaSerializatorLoader implements OnInit, OnDestroy {

    private _bearerToken: string = "";
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    _serverJwtResponse!: SimpleMessageResWithErrorModel;
    _suspenseLoading$: Observable<boolean> = this._store.select(NgrxSelector_NWL.sel_unsubscribeLoadingViaJwt);

    readonly _serverResReqHelper: ServerReqResHelper = new ServerReqResHelper();

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _route: ActivatedRoute,
        private _store: Store<NewsletterReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.STATIC_CONTENT_MODULE,
            SinglePageType.UNSUBSRIBE_NEWSLETTER_VIA_EMAIL_PAGE);
    };

    ngOnInit(): void {
        this._store.dispatch(NgrxAction_NWL.__activeSuspense({ for: SuspenseLoader.UNSUBSCRIBE_VIA_JWT }));
        this._bearerToken = String(this._route.snapshot.paramMap.get("bearerToken"));
        RxjsHelper.subscribeData(this._store, NgrxSelector_NWL.sel_jwtResponse, this._ngUnsubscribe)
            .subscribe(data => this._serverJwtResponse = data);
        this._store.dispatch(NgrxAction_NWL.__unsubscribeNewsletterViaJwt({ bearerToken: this._bearerToken }));
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
