/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: header-with-navigation.component.ts
 * Last modified: 22/08/2022, 17:10
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
import { Router } from "@angular/router";

import { NavigationLinksModel } from "../../../../models/navigation-links.model";

import * as NAVIGATION_LIST from "../../../../../assets/static-data/main-navigation-links.json";
import * as QUICK_AND_AUTH_NAVIGATION_LIST from "../../../../../assets/static-data/quick-start-navigation-links.json";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-header-with-navigation",
    templateUrl: "./header-with-navigation.component.html",
    styleUrls: [ "./header-with-navigation.component.scss" ]
})
export class HeaderWithNavigationComponent {

    readonly _mainNavigationList: Array<NavigationLinksModel>;
    readonly _quickStartNavigationList: Array<NavigationLinksModel>;
    readonly _authNavigationList: Array<NavigationLinksModel>;

    constructor(
        public _router: Router,
    ) {
        this._mainNavigationList = (NAVIGATION_LIST as any).default;
        this._quickStartNavigationList = this.filterQuickStartNavigationLinks(false);
        this._authNavigationList = this.filterQuickStartNavigationLinks(true);
    };

    private filterQuickStartNavigationLinks(isAuth: boolean): Array<NavigationLinksModel> {
        return (QUICK_AND_AUTH_NAVIGATION_LIST as any).default
            .filter(({ link }: NavigationLinksModel) => isAuth ? link.includes("auth") : !link.includes("auth"));
    };

    cssClassCheckIfIsSignupElement(navigationLinkData: NavigationLinksModel): string {
        return navigationLinkData.link.includes("signup")
            ? "sign-up__anchor-element" : "navigation-list-element__anchor-element";
    };
}
