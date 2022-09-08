/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth-horizontal-logo.component.ts
 * Last modified: 08/09/2022, 15:59
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

import { BrowserThemeDetector } from "../../../../browster-utils/browser-theme.detector";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-auth-horizontal-logo",
    templateUrl: "./auth-horizontal-logo.component.html",
    styleUrls: [ "./auth-horizontal-logo.component.scss" ],
})
export class AuthHorizontalLogoComponent {

    private readonly LIGHT_LOGO = "assets/gfx/images/main-light-logo.svg" as const;
    private readonly DARK_LOGO = "assets/gfx/images/main-dark-logo.svg" as const;

    selectApplicationLogoBasedCurrentTheme(): string {
        return BrowserThemeDetector.isDarkThemeActive() ? this.DARK_LOGO : this.LIGHT_LOGO;
    };
}
