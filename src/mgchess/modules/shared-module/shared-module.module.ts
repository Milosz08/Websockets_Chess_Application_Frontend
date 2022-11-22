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
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { FooterComponent } from "./components/footer/footer.component";
import { ThemeTogglerComponent } from "./components/theme-toggler/theme-toggler.component";
import { PasswordInputComponent } from "./components/password-input/password-input.component";
import { UserProfileImageComponent } from "./components/user-profile-image/user-profile-image.component";
import { WindowModalWrapperComponent } from "./components/window-modal-wrapper/window-modal-wrapper.component";
import { CopyrightNewsletterComponent } from "./components/copyright-newsletter/copyright-newsletter.component";
import { CookiesNotificationComponent } from "./components/cookies-notification/cookies-notification.component";
import { UserNotLoggedBannerComponent } from "./components/user-not-logged-banner/user-not-logged-banner.component";
import { GlobalSuspenseLoaderComponent } from "./components/global-suspense-loader/global-suspense-loader.component";
import { SingleChoiceBoxInputComponent } from "./components/single-choice-box-input/single-choice-box-input.component";
import { SimpleServerResponseQueryComponent } from "./components/simple-server-response-query/simple-server-response-query.component";
import { GlobalServerResponseModalComponent } from "./components/global-server-response-modal/global-server-response-modal.component";
import { UserBannerWithAvatarAccountComponent } from "./components/user-banner-with-avatar-account/user-banner-with-avatar-account.component";

import { UploadFilesMouseEventsDirective } from "./directives/upload-files-mouse-events.directive";
import { CloseOutsideClickComponentDirective } from "./directives/close-outside-click-component.directive";

import { InjectCdnUrlPrefixPipe } from "./pipes/inject-cdn-url-prefix.pipe";

import { gfxNgrxStore } from "./ngrx-store/gfx-ngrx-store/gfx.reducer";
import { sessionNgrxStore } from "./ngrx-store/session-ngrx-store/session.reducer";

import { GfxEffects } from "./ngrx-store/gfx-ngrx-store/ngrx-effects/gfx.effects";
import { LoginEffects } from "./ngrx-store/session-ngrx-store/ngrx-effects/login.effects";
import { LoginHelperEffects } from "./ngrx-store/session-ngrx-store/ngrx-effects/login-helper.effects";
import { ResendEmailGfxEffects } from "./ngrx-store/gfx-ngrx-store/ngrx-effects/resend-email-gfx.effects";

import { SessionReqResService } from "./services/session-req-res.service";
import { GlobalSuspenseService } from "./services/global-suspense.service";
import { UserRememberStorageService } from "./services/user-remember-storage.service";
import { AddToNewsletterHttpReqResService } from "./services/add-to-newsletter-http-req-res.service";
import { ResendVerificationLinkReqResService } from "./services/resend-verification-link-req-res.service";
import { CookiesNotificationLocalStorageService } from "./services/cookies-notification-local-storage.service";

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // components
        FooterComponent,
        ThemeTogglerComponent,
        PasswordInputComponent,
        UserProfileImageComponent,
        WindowModalWrapperComponent,
        CopyrightNewsletterComponent,
        CookiesNotificationComponent,
        UserNotLoggedBannerComponent,
        GlobalSuspenseLoaderComponent,
        SingleChoiceBoxInputComponent,
        SimpleServerResponseQueryComponent,
        GlobalServerResponseModalComponent,
        UserBannerWithAvatarAccountComponent,
        // directives
        UploadFilesMouseEventsDirective,
        CloseOutsideClickComponentDirective,
        // pipes
        InjectCdnUrlPrefixPipe,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        // ngrx store
        StoreModule.forFeature(gfxNgrxStore.reducerName, gfxNgrxStore.reducerFunc),
        StoreModule.forFeature(sessionNgrxStore.reducerName, sessionNgrxStore.reducerFunc),
        EffectsModule.forFeature([
            GfxEffects,
            LoginEffects,
            LoginHelperEffects,
            ResendEmailGfxEffects,
        ]),
    ],
    exports: [
        // components
        FooterComponent,
        ThemeTogglerComponent,
        PasswordInputComponent,
        UserProfileImageComponent,
        WindowModalWrapperComponent,
        CopyrightNewsletterComponent,
        UserNotLoggedBannerComponent,
        CookiesNotificationComponent,
        SingleChoiceBoxInputComponent,
        GlobalSuspenseLoaderComponent,
        SimpleServerResponseQueryComponent,
        GlobalServerResponseModalComponent,
        UserBannerWithAvatarAccountComponent,
        // directives
        UploadFilesMouseEventsDirective,
        CloseOutsideClickComponentDirective,
        // pipes
        InjectCdnUrlPrefixPipe,
    ],
    providers: [
        SessionReqResService,
        GlobalSuspenseService,
        UserRememberStorageService,
        AddToNewsletterHttpReqResService,
        ResendVerificationLinkReqResService,
        CookiesNotificationLocalStorageService,
    ],
})
export class SharedModuleModule {}
