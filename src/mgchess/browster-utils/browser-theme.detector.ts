/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: FaviconThemeDetector.ts
 * Last modified: 22/08/2022, 13:51
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

export class BrowserThemeDetector {

    private static readonly FAV_DIR: string = "../assets/gfx/favicons/" as const;
    public static readonly CSS_DARK_CLASS: string = "dark-theme--active" as const;

    private static readonly FAV_LIGHT: string = this.FAV_DIR + "favicon-light.png";
    private static readonly FAV_DARK: string = this.FAV_DIR + "favicon-dark.png";

    public static readonly LIGHT_LOGO = "assets/gfx/images/main-light-logo.svg" as const;
    public static readonly DARK_LOGO = "assets/gfx/images/main-dark-logo.svg" as const;

    static detectBrowserThemeAndChangeFavicon(): void {
        if (!window.matchMedia) return;
        const preferColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        this.changeFaviconListenerCallback(preferColorScheme.matches);
        preferColorScheme.addEventListener("change", e => this.changeFaviconListenerCallback(e.matches));
    };

    private static changeFaviconListenerCallback(isDark: boolean) {
        if (isDark) {
            this.setFavicon(this.FAV_LIGHT);
            document.body.classList.add(this.CSS_DARK_CLASS);
            console.log("Prefered browser color scheme is set to DARK.");
        } else {
            this.setFavicon(this.FAV_DARK);
            document.body.classList.remove(this.CSS_DARK_CLASS);
            console.log("Prefered browser color scheme is set to LIGHT.");
        }
    };

    private static setFavicon(imagePath: string): void {
        const linkElement = document.querySelector("link[rel=icon]") as HTMLLinkElement;
        linkElement.href = imagePath;
    };

    static isDarkThemeActive(): boolean {
        return document.body.classList.contains(this.CSS_DARK_CLASS);
    };

    static getLogoSrcBasedCurrentTheme(): string {
        return this.isDarkThemeActive() ? this.DARK_LOGO : this.LIGHT_LOGO;
    };
}
