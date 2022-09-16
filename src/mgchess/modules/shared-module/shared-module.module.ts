/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: shared-module.module.ts
 * Last modified: 21/08/2022, 21:59
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";

import { FooterComponent } from "./components/footer/footer.component";
import { ThemeTogglerComponent } from "./components/theme-toggler/theme-toggler.component";
import { PasswordInputComponent } from "./components/password-input/password-input.component";
import { CopyrightNewsletterComponent } from "./components/copyright-newsletter/copyright-newsletter.component";
import { CookiesNotificationComponent } from "./components/cookies-notification/cookies-notification.component";
import { SingleChoiceBoxInputComponent } from "./components/single-choice-box-input/single-choice-box-input.component";

import { ContentNotFoundPageComponent } from "./pages/content-not-found-page/content-not-found-page.component";

import { CloseOutsideClickComponentDirective } from "./directives/close-outside-click-component.directive";

import { globalNgrxStore } from "./ngrx-store/global-ngrx-store/global.reducer";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // components
        FooterComponent,
        ThemeTogglerComponent,
        PasswordInputComponent,
        CopyrightNewsletterComponent,
        // pages
        ContentNotFoundPageComponent,
        CookiesNotificationComponent,
        SingleChoiceBoxInputComponent,
        // directives
        CloseOutsideClickComponentDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        StoreModule.forFeature(globalNgrxStore.reducerName, globalNgrxStore.reducerFunc),
    ],
    exports: [
        FooterComponent,
        ThemeTogglerComponent,
        PasswordInputComponent,
        CopyrightNewsletterComponent,
        CookiesNotificationComponent,
        SingleChoiceBoxInputComponent,
    ],
})
export class SharedModuleModule {}
