/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: session.actions.ts
 * Last modified: 25/09/2022, 04:08
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

import { createAction, props } from "@ngrx/store";
import { LoginFormModel } from "../../../auth-register-module/models/login-form.model";

import { UserCredentialsDataResModel } from "./ngrx-models/user-credentials-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_LOGIN_VIA_LOCAL = "[SESSION] ATTEMPT LOGIN VIA LOCAL" as const;
const ATTEMPT_LOGIN_VIA_OAUTH2 = "[SESSION] ATTEMPT LOGIN VIA OAUTH2" as const;
const SUCCESSFUL_LOGIN = "[SESSION] SUCCESSFUL LOGIN" as const;
const FAILURE_LOGIN = "[SESSION] FAILURE LOGIN" as const;

const ATTEMPT_TO_LOGOUT = "[SESSION] ATTEMPT TO LOGOUT" as const;
const SUCCESSFUL_LOGOUT = "[SESSION] SUCCESSFUL LOGOUT" as const;
const FAILURE_LOGOUT = "[SESSION] FAILURE LOGOUT" as const;

const CLEAR_SERVER_RESPONSE = "[SESSION] CLEAR SERVER RESPONSE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToLoginViaLocal = createAction(
    ATTEMPT_LOGIN_VIA_LOCAL,
    props<{ loginForm: LoginFormModel }>(),
);

export const __attemptToLoginViaOAuth2 = createAction(
    ATTEMPT_LOGIN_VIA_OAUTH2,
    props<{ jwtToken: string }>(),
);

export const __successfulLogin = createAction(
    SUCCESSFUL_LOGIN,
    props<{ credentialsData: UserCredentialsDataResModel }>(),
);

export const __failureLogin = createAction(
    FAILURE_LOGIN,
    props<{ serverResponse: string }>(),
);

export const __attemptToLogout = createAction(
    ATTEMPT_TO_LOGOUT,
);

export const __successfulLogout = createAction(
    SUCCESSFUL_LOGOUT,
);

export const __failureLogout = createAction(
    FAILURE_LOGOUT,
    props<{ serverResponse: string }>(),
);

export const __clearServerResponse = createAction(
    CLEAR_SERVER_RESPONSE,
);
