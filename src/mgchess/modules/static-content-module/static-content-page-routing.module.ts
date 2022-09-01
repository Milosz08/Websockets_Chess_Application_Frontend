/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: static-content-page-routing.module.ts
 * Last modified: 21/08/2022, 21:47
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

import { StaticContentPageComponent } from "./static-content-page.component";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RankingsPageComponent } from "./pages/rankings-page/rankings-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { GameRulesPageComponent } from "./pages/game-rules-page/game-rules-page.component";
import { ReportABugPageComponent } from "./pages/report-a-bug-page/report-a-bug-page.component";
import { ContactWithUsPageComponent } from "./pages/contact-with-us-page/contact-with-us-page.component";
import { NewsletterPageComponent } from "./pages/newsletter-page/newsletter-page.component";
import { PrivacyPolicyPageComponent } from "./pages/privacy-policy-page/privacy-policy-page.component";

//----------------------------------------------------------------------------------------------------------------------

const routes: Routes = [
    { path: "", component: StaticContentPageComponent, children: [
        { path: "", component: HomePageComponent },
        { path: "rankings", component: RankingsPageComponent },
        { path: "about", component: AboutPageComponent },
        { path: "game-rules", component: GameRulesPageComponent },
        { path: "report-a-bug", component: ReportABugPageComponent },
        { path: "contact-with-us", component: ContactWithUsPageComponent },
        { path: "newsletter", component: NewsletterPageComponent },
        { path: "privacy-policy", component: PrivacyPolicyPageComponent },
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
export class StaticContentPageRoutingModule {}
