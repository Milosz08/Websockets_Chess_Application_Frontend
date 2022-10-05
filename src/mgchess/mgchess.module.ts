/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: mgchess.module.ts
 * Last modified: 21/08/2022, 18:31
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

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "../environments/environment";

import { MgchessComponent } from "./mgchess.component";
import { MgchessRoutingModule } from "./mgchess-routing.module";
import { SharedModuleModule } from "./modules/shared-module/shared-module.module";

import { ColorThemeLocalStorageService } from "./services/color-theme-local-storage.service";

import { OnNonLoggedRedirectGuard } from "./guards/on-non-logged-redirect.guard";
import { OnAlreadyLoggedRedirectGuard } from "./guards/on-already-logged-redirect.guard";
import { OnEmptyRedirectParametersGuard } from "./guards/on-empty-redirect-parameters.guard";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        MgchessComponent,
    ],
    imports: [
        BrowserModule,
        SharedModuleModule,
        // routing
        RouterModule,
        HttpClientModule,
        MgchessRoutingModule,
        // animations
        BrowserAnimationsModule,
        // ngrx store
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    ],
    providers: [
        OnNonLoggedRedirectGuard,
        OnAlreadyLoggedRedirectGuard,
        ColorThemeLocalStorageService,
        OnEmptyRedirectParametersGuard,
    ],
    bootstrap: [
        MgchessComponent,
    ],
})
export class MgchessModule {}
