/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: cookies-notification-local-storage.service.ts
 * Last modified: 01/09/2022, 23:40
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

import { Injectable } from "@angular/core";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class CookiesNotificationLocalStorageService {

    private readonly LOCAL_STORAGE = window.localStorage;
    private readonly LOCAL_STORAGE_COOKIE_KEY = "COOKIE_NOTIFICATION_REMEMBER" as const;

    rememberCookiePreferences() {
        if (this.LOCAL_STORAGE === null) return;
        this.LOCAL_STORAGE.setItem(this.LOCAL_STORAGE_COOKIE_KEY, "TRUE");
    };

    checkIfPreferencedAreRemembered(): boolean {
        if (this.LOCAL_STORAGE === null) return false;
        const rememberedPreferences = this.LOCAL_STORAGE.getItem(this.LOCAL_STORAGE_COOKIE_KEY);
        return !(!!rememberedPreferences && rememberedPreferences === "TRUE");
    };
}
