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

import { SignupFormModel } from "../../models/signup-form.model";
import { LoginSignupViaOAuth2ReqModel } from "../../../../models/login-signup-via-oauth2-req.model";
import { FinishSignupAccountDataResModel } from "./ngrx-models/finish-signup-account-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_TO_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] ATTEMPT TO FINISH SIGNUP VIA OAUTH2" as const;
const SUCCESSFUL_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] SUCCESSFUL ATTEMPT FINISH SIGNUP VIA OAUTH2" as const;
const FAILURE_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] FAILURE ATTEMPT FINISH SIGNUP VIA OAUTH2" as const;

const ATTEMPT_SIGNUP_VIA_LOCAL = "[AUTH] ATTEMPT SIGNUP VIA LOCAL" as const;
const SUCCESSFUL_SIGNUP_VIA_LOCAL = "[AUTH] SUCCESSFUL SIGNUP VIA LOCAL" as const;
const FAILURE_SIGNUP_VIA_LOCAL = "[AUTH] FAILURE SIGNUP VIA LOCAL" as const;

const CLEAR_SERVER_RESPONSE = "[AUTH] CLEAR SERVER RESPONSE" as const;
const CLEAR_FINISH_SIGNUP_USER_DATA = "[AUTH] CLEAR FINISH SIGNUP USER DATA" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToFinishSignupViaOAuth2 = createAction(
    ATTEMPT_TO_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ req: LoginSignupViaOAuth2ReqModel }>(),
);

export const __successfulAttemptFinishSignupViaOAuth2 = createAction(
    SUCCESSFUL_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ finishAccountDetails: FinishSignupAccountDataResModel }>(),
);

export const __failureAttemptFinishSignupViaOAuth2 = createAction(
    FAILURE_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
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

export const __clearServerResponse = createAction(
    CLEAR_SERVER_RESPONSE,
);

export const __clearFinishSignupUserData = createAction(
    CLEAR_FINISH_SIGNUP_USER_DATA,
);
