/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: footer.component.ts
 * Last modified: 24/08/2022, 20:01
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

import * as NAVIGATION_LIST from "../../../../../assets/static-data/main-navigation-links.json";
import * as QUICK_START_NAVIGATION_LIST from "../../../../../assets/static-data/quick-start-navigation-links.json";

import { NavigationLinksModel } from "../../../../models/NavigationLinksModel";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-footer",
    templateUrl: "./footer.component.html",
    styleUrls: [ "./footer.component.scss" ]
})
export class FooterComponent {

    readonly _mainNavigationList: Array<NavigationLinksModel>;
    readonly _quickStartNavigationList: Array<NavigationLinksModel>;

    constructor() {
        this._mainNavigationList = (NAVIGATION_LIST as any).default;
        this._quickStartNavigationList = (QUICK_START_NAVIGATION_LIST as any).default;
    };
}
