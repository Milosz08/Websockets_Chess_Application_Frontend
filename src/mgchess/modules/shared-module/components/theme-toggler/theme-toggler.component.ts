/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: theme-toggler.component.ts
 * Last modified: 24/08/2022, 23:46
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

import { ColorThemeLocalStorageService } from "../../../../services/color-theme-local-storage.service";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-theme-toggler",
    templateUrl: "./theme-toggler.component.html",
    styleUrls: [ "./theme-toggler.component.scss" ],
    providers: [ ColorThemeLocalStorageService ],
})
export class ThemeTogglerComponent implements OnInit {

    private readonly ACTIVE_LIGHT_THEME_CSS = "theme-toggler__checkbox-input";
    private readonly ACTIVE_DARK_THEME_CSS = this.ACTIVE_LIGHT_THEME_CSS + " dark-mode--active";

    _isDarkThemeSet: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _storageService: ColorThemeLocalStorageService
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._isDarkThemeSet = this._storageService.checkSavedColorThemeAndReturn();
    };

    handleToggleApplicationTheme(): void {
        this._isDarkThemeSet = !this._isDarkThemeSet;
        this._storageService.rememberChooseTheme(this._isDarkThemeSet);
    };

    get __bulletPositionBaseThemeCssClass(): string {
        return this._isDarkThemeSet ? this.ACTIVE_LIGHT_THEME_CSS : this.ACTIVE_DARK_THEME_CSS;
    };
}
