/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: newsletter-page.component.ts
 * Last modified: 25/08/2022, 16:46
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

import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import { NewsletterReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxAction_NWL from "../../ngrx-store/newsletter-ngrx-store/newsletter.actions";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-unsubscribe-newsletter-page",
    templateUrl: "./newsletter-page.component.html",
    styleUrls: [ "./newsletter-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container" },
})
export class NewsletterPageComponent extends BrowserMetaSerializatorLoader implements OnInit {

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<NewsletterReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.STATIC_CONTENT_MODULE, SinglePageType.NEWSLETTER_PAGE);
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.dispatch(NgrxAction_NWL.__initialClearAllState());
    };
}
