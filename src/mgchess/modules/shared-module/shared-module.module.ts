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

import { FooterComponent } from './components/footer/footer.component';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { HorizontalTitleComponent } from './components/horizontal-title/horizontal-title.component';
import { CopyrightNewsletterComponent } from './components/copyright-newsletter/copyright-newsletter.component';

import { ContentNotFoundPageComponent } from './pages/content-not-found-page/content-not-found-page.component';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // components
        FooterComponent,
        ThemeTogglerComponent,
        HorizontalTitleComponent,
        CopyrightNewsletterComponent,
        // pages
        ContentNotFoundPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        ThemeTogglerComponent,
        HorizontalTitleComponent,
        CopyrightNewsletterComponent,
    ],
})
export class SharedModuleModule {}
