/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: color-theme-local-storage.service.ts
 * Last modified: 25/08/2022, 00:45
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

import { BrowserThemeDetector } from "../../../browster-utils/BrowserThemeDetector";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ColorThemeLocalStorageService {

    private readonly LOCAL_STORAGE = window.localStorage;
    private readonly LOCAL_STORAGE_THEME_KEY = "color-theme-remember" as const;

    rememberChooseTheme(isDarkTheme: boolean): void {
        if (this.LOCAL_STORAGE === null) return;
        this.LOCAL_STORAGE.removeItem(this.LOCAL_STORAGE_THEME_KEY);
        this.LOCAL_STORAGE.setItem(this.LOCAL_STORAGE_THEME_KEY, isDarkTheme ? ColorTheme.DARK : ColorTheme.LIGHT);
        if (isDarkTheme) {
            document.body.classList.add(BrowserThemeDetector.CSS_DARK_CLASS);
        } else {
            document.body.classList.remove(BrowserThemeDetector.CSS_DARK_CLASS);
        }
    };

    checkSavedColorThemeAndReturn(): boolean {
        if (this.LOCAL_STORAGE === null) return false;
        const colorTheme = this.LOCAL_STORAGE.getItem(this.LOCAL_STORAGE_THEME_KEY) as ColorTheme;
        if (colorTheme === ColorTheme.DARK) {
            document.body.classList.add(BrowserThemeDetector.CSS_DARK_CLASS);
            return true;
        }
        document.body.classList.remove(BrowserThemeDetector.CSS_DARK_CLASS);
        return false;
    };
}

export enum ColorTheme {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}
