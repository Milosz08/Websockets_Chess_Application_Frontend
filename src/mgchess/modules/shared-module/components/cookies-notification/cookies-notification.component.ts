/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: cookies-notification.component.ts
 * Last modified: 01/09/2022, 22:48
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

import { CookiesNotificationLocalStorageService } from "../../services/cookies-notification-local-storage.service";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-cookies-notification",
    templateUrl: "./cookies-notification.component.html",
    styleUrls: [ "./cookies-notification.component.scss" ],
    providers: [ CookiesNotificationLocalStorageService ],
})
export class CookiesNotificationComponent {

    constructor(
        public _notificationLocalStorageService: CookiesNotificationLocalStorageService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    handleAcceptCookies(): void {
        this._notificationLocalStorageService.rememberCookiePreferences();
    };
}
