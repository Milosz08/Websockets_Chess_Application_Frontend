/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: suspense-loader-res.model.ts
 * Last modified: 25/09/2022, 04:45
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

export enum SuspenseLoader {
    INACTIVE = "INACTIVE",
    ATTEMPT_UNSUBSCRIBE = "ATTEMPT_UNSUBSCRIBE",
    UNSUBSCRIBE_VIA_OTA = "UNSUBSCRIBE_VIA_OTA",
    UNSUBSCRIBE_VIA_JWT = "UNSUBSCRIBE_VIA_JWT",
    ATTEMPT_LOGIN_VIA_LOCAL = "ATTEMPT_LOGIN_VIA_LOCAL",
    ATTEMPT_SIGNUP_VIA_LOCAL = "ATTEMPT_SIGNUP_VIA_LOCAL",
    ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2",
    ATTEMPT_LOGIN_VIA_OAUTH2 = "ATTEMPT_LOGIN_VIA_OAUTH2",
    FINISH_SIGNUP_VIA_OAUTH2 = "FINISH_SIGNUP_VIA_OAUTH2",
    RESEND_ACTIVATE_ACCOUNT_LINK = "RESEND_ACTIVATE_ACCOUNT_LINK",
    ACTIVATE_ACCOUNT_VIA_OTA = "ACTIVATE_ACCOUNT_VIA_OTA",
}

//----------------------------------------------------------------------------------------------------------------------

export class SuspenseLoaderResModel {
    isSuspenseLoading: boolean;
    loadingFor: SuspenseLoader;

    constructor(isSuspenseLoading: boolean, loadingFor: SuspenseLoader) {
        this.isSuspenseLoading = isSuspenseLoading;
        this.loadingFor = loadingFor;
    }
}
