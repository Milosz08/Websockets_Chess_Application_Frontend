/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: mobile-header-with-navigation.component.ts
 * Last modified: 24/08/2022, 22:12
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

import { NavigationLinksModel } from "../../../../models/NavigationLinksModel";
import { HamburgerActivityCssClasses } from "../../models/HamburgerActivityCssClasses";

import * as NAVIGATION_LINKS from "../../../../../assets/static-data/main-navigation-links.json";
import * as QUICK_AUTH_NAVIGATION_LINKS from "../../../../../assets/static-data/quick-start-navigation-links.json";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-mobile-header-with-navigation",
    templateUrl: "./mobile-header-with-navigation.component.html",
    styleUrls: [ "./mobile-header-with-navigation.component.scss" ]
})
export class MobileHeaderWithNavigationComponent {

    private readonly BASIC_HAMBURGER_CLASS = "hamburger__lines";
    private readonly HAMBURGER_ACTIVE_CLASS = this.BASIC_HAMBURGER_CLASS + " hamburger-menu--active";
    private readonly BASIC_MENU_CLASS = "hamburger-menu__container";
    private readonly MENU_ACTIVE_CLASS = this.BASIC_MENU_CLASS + " hamburger-menu--active";

    _hamburgerMenuActive: boolean = false;
    readonly _navigationLinks: Array<Array<NavigationLinksModel>>;

    constructor() {
        this._navigationLinks = [ (NAVIGATION_LINKS as any).default, (QUICK_AUTH_NAVIGATION_LINKS as any).default ];
    };

    handleToggleHamburgerMenuActive(): void {
        this._hamburgerMenuActive = !this._hamburgerMenuActive;
    };

    hamburgerMenuHighlighElement(navLink: NavigationLinksModel): string {
        return navLink.name.includes('start') ? 'link-anchor--filled' : ''
    }

    get __hamburgerToggleCssClass(): HamburgerActivityCssClasses {
        return this._hamburgerMenuActive
            ? new HamburgerActivityCssClasses(this.HAMBURGER_ACTIVE_CLASS, this.MENU_ACTIVE_CLASS)
            : new HamburgerActivityCssClasses(this.BASIC_HAMBURGER_CLASS, this.BASIC_MENU_CLASS);
    };
}
