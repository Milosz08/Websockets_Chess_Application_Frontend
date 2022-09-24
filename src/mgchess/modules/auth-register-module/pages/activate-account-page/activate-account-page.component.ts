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

import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-activate-account-page",
    templateUrl: "./activate-account-page.component.html",
    styleUrls: [ "./activate-account-page.component.scss" ],
    host: { class: "mg-chess__flex-safety-container remove-margin__small-devices" },
})
export class ActivateAccountPageComponent extends BrowserMetaSerializatorLoader {

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
    ) {
        super(_titleService, _metaService, SingleModuleType.AUTH_REGISTER_MODULE, SinglePageType.ACTIVATE_ACCOUNT_PAGE);
    };
}
