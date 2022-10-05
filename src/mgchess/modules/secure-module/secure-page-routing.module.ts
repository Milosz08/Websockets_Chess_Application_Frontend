/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: secure-page-routing.module.ts
 * Last modified: 05/10/2022, 22:04
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
import { RouterModule, Routes } from "@angular/router";

import { SecurePageComponent } from "./secure-page.component";

import { MyAccountPageComponent } from "./pages/my-account-page/my-account-page.component";
import { MyAccountDashboardPageComponent } from "./pages/my-account-dashboard-page/my-account-dashboard-page.component";

import { OnNonLoggedRedirectGuard } from "../../guards/on-non-logged-redirect.guard";

//----------------------------------------------------------------------------------------------------------------------

const routes: Routes = [
    { path: "", component: SecurePageComponent, children: [
        { path: "", redirectTo: "secure", pathMatch: "full" },
        { path: "my-account", component: MyAccountPageComponent, canActivate: [ OnNonLoggedRedirectGuard ], children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: MyAccountDashboardPageComponent },
        ]},
    ]},
];

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SecurePageRoutingModule {}
