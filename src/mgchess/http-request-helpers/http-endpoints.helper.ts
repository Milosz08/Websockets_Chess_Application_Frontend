/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: http-endpoints.helper.ts
 * Last modified: 25/08/2022, 22:08
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

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

//----------------------------------------------------------------------------------------------------------------------

@Injectable({ providedIn: "root" })
export class HttpEndpointsHelper {

    private readonly BASIC_HTTP = environment.httpBackendURI + "javabean/app/v1/";

    //------------------------------------------------------------------------------------------------------------------

    private readonly NEWSLETTER_EMAIL = this.BASIC_HTTP + "newsletter-email/";
    readonly NEWSLETTER_SUBSCRIBE = this.NEWSLETTER_EMAIL + "subscribe";
    readonly NEWSLETTER_ATTEMPT_UNSUBSCRIBE = this.NEWSLETTER_EMAIL + "attempt-unsubscribe";
    readonly NEWSLETTER_UNSUBSCRIBE_VIA_OTA = this.NEWSLETTER_EMAIL + "unsubscribe-via-ota";
    readonly NEWSLETTER_UNSUBSCRIBE_RESEND_EMAIL = this.NEWSLETTER_EMAIL + "unsubscribe-resend-email";

    //------------------------------------------------------------------------------------------------------------------

    private readonly AUTH = this.BASIC_HTTP + "auth/";
    readonly LOGIN_VIA_LOCAL = this.AUTH + "login-via-local";
    readonly LOGIN_VIA_OAUTH2 = this.AUTH + "login-via-oauth";
    readonly AUTO_LOGIN = this.AUTH + "auto-login";
    readonly REFRESH_TOKEN = this.AUTH + "refresh-token";
    readonly LOGOUT = this.AUTH + "logout";
    readonly ATTEMPT_ACTIVATE_ACCOUNT = this.AUTH + "attempt-activate-account";
    readonly ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = this.AUTH + "attempt-finish-signup-via-oauth";
    readonly FINISH_SIGNUP_VIA_OAUTH2 = this.AUTH + "finish-signup-via-oauth";
    readonly SIGNUP_VIA_LOCAL = this.AUTH + "signup-via-local";
    readonly ATTEMPT_FINISH_SIGNUP_RESEND_EMAIL = this.AUTH + "attempt-finish-signup-resend-email";

    //------------------------------------------------------------------------------------------------------------------

    private readonly RENEW_CREDETIALS_LOCAL = this.BASIC_HTTP + "renew-credentials/";
    readonly ATTEMPT_TO_CHANGE_PASSWORD = this.RENEW_CREDETIALS_LOCAL + "attempt-to-change-password";
    readonly CHANGE_PASSWORD_CHECK_JWT = this.RENEW_CREDETIALS_LOCAL + "change-password-check-jwt";
    readonly CHANGE_FORGOTTEN_PASSWORD = this.RENEW_CREDETIALS_LOCAL + "change-forgotten-password";
    readonly CHANGE_PASSWORD_RESEND_EMAIL = this.RENEW_CREDETIALS_LOCAL + "change-password-resend-email";

    //------------------------------------------------------------------------------------------------------------------

    private readonly OTA_TOKEN_ENDPOINT = this.BASIC_HTTP + "ota-token/";
    readonly VALIDATE_ATTEMPT_TO_CHANGE_PASSWORD = this.OTA_TOKEN_ENDPOINT + "change-password";
    readonly ACTIVATE_ACCOUNT = this.OTA_TOKEN_ENDPOINT + "activate-account";

    //------------------------------------------------------------------------------------------------------------------

    private readonly EXPOSE_STATIC_DATA = this.BASIC_HTTP + "static-data/";
    readonly SIGNUP_CALENDAR_DATA = this.EXPOSE_STATIC_DATA + "signup-calendar-data";
    readonly SIGNUP_GENDER_DATA = this.EXPOSE_STATIC_DATA + "signup-gender-data";
    readonly SIGNUP_COUNTRY_DATA = this.EXPOSE_STATIC_DATA + "signup-country-data";
    readonly REMEMBER_ACCOUNTS = this.EXPOSE_STATIC_DATA + "remember-accounts";

    //------------------------------------------------------------------------------------------------------------------

    private readonly USER_IMAGE_ENDPOINT = this.BASIC_HTTP + "user-image/";
    readonly USER_IMAGES_ALL = this.USER_IMAGE_ENDPOINT + "images-all";
    readonly PROFILE_IMAGE = this.USER_IMAGE_ENDPOINT + "profile";
    readonly BANNER_IMAGE = this.USER_IMAGE_ENDPOINT + "banner";
}
