/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth.actions.ts
 * Last modified: 09/09/2022, 14:43
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

import { LoginFormModel } from "../../models/login-form.model";
import { SignupFormModel } from "../../models/signup-form.model";
import { LoginViaOAuth2ReqModel } from "./ngrx-models/login-data-req.model";
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { UserCredentialsDataResModel } from "./ngrx-models/user-credentials-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_LOGIN_VIA_LOCAL = "[AUTH] ATTEMPT LOGIN VIA LOCAL" as const;
const ATTEMPT_LOGIN_VIA_OAUTH2 = "[AUTH] ATTEMPT LOGIN VIA OAUTH2" as const;
const SUCCESSFUL_LOGIN = "[AUTH] SUCCESSFUL LOGIN" as const;
const FAILURE_LOGIN = "[AUTH] FAILURE LOGIN" as const;

const ATTEMPT_SIGNUP_VIA_LOCAL = "[AUTH] ATTEMPT SIGNUP VIA LOCAL" as const;
const SUCCESSFUL_SIGNUP_VIA_LOCAL = "[AUTH] SUCCESSFUL SIGNUP VIA LOCAL" as const;
const FAILURE_SIGNUP_VIA_LOCAL = "[AUTH] FAILURE SIGNUP VIA LOCAL" as const;

const ACTIVE_SUSPENSE_LOADER = "[AUTH] ACTIVE SUSPENSE LOADER" as const;
const INACTIVE_SUSPENSE_LOADER = "[AUTH] INACTIVE SUSPENSE LOADER" as const;

const CLEAN_SERVER_RESPONSE = "[AUTH] CLEAN SERVER RESPONSE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToLoginViaLocal = createAction(
    ATTEMPT_LOGIN_VIA_LOCAL,
    props<{ loginForm: LoginFormModel }>(),
);

export const __attemptToLoginViaOAuth2 = createAction(
    ATTEMPT_LOGIN_VIA_OAUTH2,
    props<{ req: LoginViaOAuth2ReqModel }>(),
);

export const __successfulLogin = createAction(
    SUCCESSFUL_LOGIN,
    props<{ credentialsData: UserCredentialsDataResModel }>(),
);

export const __failureLogin = createAction(
    FAILURE_LOGIN,
    props<{ serverResponse: string }>(),
);

export const __attemptToSingUpViaLocal = createAction(
    ATTEMPT_SIGNUP_VIA_LOCAL,
    props<{ signupForm: SignupFormModel }>(),
);

export const __successfulSingUpViaLocal = createAction(
    SUCCESSFUL_SIGNUP_VIA_LOCAL,
    props<{ serverResponse: string }>(),
);

export const __failureSingUpViaLocal = createAction(
    FAILURE_SIGNUP_VIA_LOCAL,
    props<{ serverResponse: string }>(),
);

export const __cleanServerResponse = createAction(
    CLEAN_SERVER_RESPONSE,
);

export const __activeSuspense = createAction(
    ACTIVE_SUSPENSE_LOADER,
    props<{ for: SuspenseLoader }>(),
);

export const __disactiveSuspense = createAction(
    INACTIVE_SUSPENSE_LOADER,
);
