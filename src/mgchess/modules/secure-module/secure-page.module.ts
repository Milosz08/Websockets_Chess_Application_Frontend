/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: secure-page.module.ts
 * Last modified: 05/10/2022, 22:03
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
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { UploadImageZoneBoxComponent } from "./components/upload-image-zone-box/upload-image-zone-box.component";
import { ChangeBannerImageWindowModalComponent } from "./components/change-banner-image-window-modal.component";
import { ChangeProfileImageWindowModalComponent } from "./components/change-profile-image-window-modal.component";
import { UserChangeAccountDescriptionComponent } from "./components/user-change-account-description/user-change-account-description.component";
import { UniversalChangeUserImageModalComponent } from "./components/universal-change-user-image-modal/universal-change-user-image-modal.component";

import { SecurePageComponent } from "./secure-page.component";
import { MyAccountPageComponent } from "./pages/my-account-page/my-account-page.component";
import { MyAccountFriendsPageComponent } from "./pages/my-account-friends-page/my-account-friends-page.component";
import { MyAccountSettingsPageComponent } from "./pages/my-account-settings-page/my-account-settings-page.component";
import { MyAccountAboutMePageComponent } from "./pages/my-account-about-me-page/my-account-about-me-page.component";
import { MyAccountLastGamesPageComponent } from "./pages/my-account-last-games-page/my-account-last-games-page.component";

import { SettingNotificationsPageComponent } from "./pages/setting-notifications-page/setting-notifications-page.component";
import { SettingSignInAndSecurityPageComponent } from "./pages/setting-sign-in-and-security-page/setting-sign-in-and-security-page.component";
import { SettingPrivacyAndVisibilityPageComponent } from "./pages/setting-privacy-and-visibility-page/setting-privacy-and-visibility-page.component";
import { SettingPersonalDataAndGeneralPageComponent } from "./pages/setting-personal-data-and-general-page/setting-personal-data-and-general-page.component";

import { FlattedImageExtensionsPipe } from "./pipes/flatted-image-extensions.pipe";

import { SecurePageRoutingModule } from "./secure-page-routing.module";
import { SharedModuleModule } from "../shared-module/shared-module.module";
import { StaticContentPageModule } from "../static-content-module/static-content-page.module";

import { userImagesNgrxStore } from "./ngrx-store/user-images-ngrx-store/user-images.reducer";
import { userManipulatorNgrxStore } from "./ngrx-store/user-manipulator-ngrx-store/user-manipulator.reducer";

import { UserImagesEffects } from "./ngrx-store/user-images-ngrx-store/ngrx-effects/user-images.effects";
import { UserManipulatorEffects } from "./ngrx-store/user-manipulator-ngrx-store/ngrx-effects/user-manipulator.effects";

import { UserImagesHttpReqResService } from "./services/user-images-http-req-res.service";
import { UserManipulatorHttpReqResService } from "./services/user-manipulator-http-req-res.service";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // components
        UploadImageZoneBoxComponent,
        ChangeBannerImageWindowModalComponent,
        UserChangeAccountDescriptionComponent,
        ChangeProfileImageWindowModalComponent,
        UniversalChangeUserImageModalComponent,
        // pages
        SecurePageComponent,
        MyAccountPageComponent,
        MyAccountAboutMePageComponent,
        MyAccountFriendsPageComponent,
        MyAccountSettingsPageComponent,
        MyAccountLastGamesPageComponent,
        SettingNotificationsPageComponent,
        SettingSignInAndSecurityPageComponent,
        SettingPrivacyAndVisibilityPageComponent,
        SettingPersonalDataAndGeneralPageComponent,
        // pipes
        FlattedImageExtensionsPipe,
    ],
    imports: [
        CommonModule,
        SharedModuleModule,
        ReactiveFormsModule,
        SecurePageRoutingModule,
        StaticContentPageModule,
        // ngrx store
        StoreModule.forFeature(userImagesNgrxStore.reducerName, userImagesNgrxStore.reducerFunc),
        StoreModule.forFeature(userManipulatorNgrxStore.reducerName, userManipulatorNgrxStore.reducerFunc),
        EffectsModule.forFeature([
            UserImagesEffects,
            UserManipulatorEffects,
        ]),
    ],
    providers: [
        UserImagesHttpReqResService,
        UserManipulatorHttpReqResService,
    ],
})
export class SecurePageModule {}
