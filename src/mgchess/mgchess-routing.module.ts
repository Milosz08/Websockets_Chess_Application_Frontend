/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: mgchess-routing.module.ts
 * Last modified: 21/08/2022, 21:53
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

import { ContentNotFoundPageComponent } from "./modules/shared-module/pages/content-not-found-page/content-not-found-page.component";

//----------------------------------------------------------------------------------------------------------------------

const absolutePathLazyLoaderInitializer = () => (
    import("./modules/static-content-module/static-content-page.module").then(m => m.StaticContentPageModule)
);

const authRegisterPathLazyLoaderInitializer = () => (
    import("./modules/auth-register-module/auth-register-page.module").then(m => m.AuthRegisterPageModule)
);

const dynamicAppPathLazyLoaderInitializer = () => (
    import("./modules/dynamic-app-module/dynamic-app-page.module").then(m => m.DynamicAppPageModule)
);

const securePathLazyLoaderInitializer = () => (
    import("./modules/secure-module/secure-page.module").then(m => m.SecurePageModule)
);

const routes: Routes = [
    { path: "", loadChildren: absolutePathLazyLoaderInitializer },
    { path: "auth", loadChildren: authRegisterPathLazyLoaderInitializer },
    { path: "app", loadChildren: dynamicAppPathLazyLoaderInitializer },
    { path: "secure", loadChildren: securePathLazyLoaderInitializer },
    { path: "**", component: ContentNotFoundPageComponent }
];

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class MgchessRoutingModule {}
