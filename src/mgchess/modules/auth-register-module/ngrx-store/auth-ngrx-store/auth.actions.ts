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
import { FinishSignupFormModel } from "../../models/finish-signup-form.model";
import { AttemptFinishSignupResModel } from "./ngrx-models/attempt-finish-signup-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_TO_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] ATTEMPT TO ATTEMPT FINISH SIGNUP VIA OAUTH2" as const;
const SUCCESSFUL_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] SUCCESSFUL ATTEMPT FINISH SIGNUP VIA OAUTH2" as const;
const FAILURE_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] FAILURE ATTEMPT FINISH SIGNUP VIA OAUTH2" as const;

const ATTEMPT_SIGNUP_VIA_LOCAL = "[AUTH] ATTEMPT SIGNUP VIA LOCAL" as const;
const SUCCESSFUL_SIGNUP_VIA_LOCAL = "[AUTH] SUCCESSFUL SIGNUP VIA LOCAL" as const;
const FAILURE_SIGNUP_VIA_LOCAL = "[AUTH] FAILURE SIGNUP VIA LOCAL" as const;

const ATTEMPT_TO_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] ATTEMPT TO FINISH SIGNUP VIA OAUTH2" as const;
const SUCCESSFUL_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] SUCCESSFUL FINISH SIGNUP VIA OAUTH2" as const;
const FAILURE_FINISH_SIGNUP_VIA_OAUTH2 = "[AUTH] FAILURE FINISH SIGNUP VIA OAUTH2" as const;

const ATTEMPT_TO_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] ATTEMPT TO ACTIVATE ACCOUNT VIA OTA" as const;
const SUCCESSFUL_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] SUCCESSFUL ACTIVATE ACCOUNT VIA OTA" as const;
const FAILURE_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] FAILURE ACTIVATE ACCOUNT VIA OTA" as const;

const ATTEMPT_TO_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] ATTEMPT TO ATTEMPT ACTIVATE ACCOUNT VIA OTA" as const;
const SUCCESSFUL_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] SUCCESSFUL ATTEMPT ACTIVATE ACCOUNT VIA OTA" as const;
const FAILURE_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA = "[AUTH] FAILURE ATTEMPT ACTIVATE ACCOUNT VIA OTA" as const;

const CLEAR_SERVER_RESPONSE = "[AUTH] CLEAR SERVER RESPONSE" as const;
const CLEAR_FINISH_SIGNUP_USER_DATA = "[AUTH] CLEAR FINISH SIGNUP USER DATA" as const;
const FILLED_FINISH_SIGNUP_RESPONSE_MESSAGE = "[AUTH] FILLED FINISH SIGNUP RESPONSE MESSAGE" as const;
const FILLED_FINISH_SIGNUP_JWT_TOKEN = "[AUTH] FILLED FINISH SIGNUP JWT TOKEN" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToAttemptFinishSignupViaOAuth2 = createAction(
    ATTEMPT_TO_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ jwtToken: string }>(),
);

export const __successfulAttemptFinishSignupViaOAuth2 = createAction(
    SUCCESSFUL_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ finishAccountDetails: AttemptFinishSignupResModel }>(),
);

export const __failureAttemptFinishSignupViaOAuth2 = createAction(
    FAILURE_ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ serverResponse: string }>(),
);

export const __attemptToFinishSignupViaOAuth2 = createAction(
    ATTEMPT_TO_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ finishSignupForm: FinishSignupFormModel }>(),
);

export const __successfulFinishSignupViaOAuth2 = createAction(
    SUCCESSFUL_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ serverResponse: string }>(),
);

export const __failureFinishSignupViaOAuth2 = createAction(
    FAILURE_FINISH_SIGNUP_VIA_OAUTH2,
    props<{ serverResponse: string }>(),
);

export const __attemptToSingUpViaLocal = createAction(
    ATTEMPT_SIGNUP_VIA_LOCAL,
    props<{ signupForm: SignupFormModel }>(),
);

export const __successfulSingUpViaLocal = createAction(
    SUCCESSFUL_SIGNUP_VIA_LOCAL,
    props<{ newAccountDetails: AttemptFinishSignupResModel }>(),
);

export const __failureSingUpViaLocal = createAction(
    FAILURE_SIGNUP_VIA_LOCAL,
    props<{ serverResponse: string }>(),
);

export const __attemptToActivateAccountViaOta = createAction(
    ATTEMPT_TO_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ token: string }>(),
);

export const __successfulActivateAccountViaOta = createAction(
    SUCCESSFUL_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ serverResponse: string }>(),
);

export const __failureActivateAccountViaOta = createAction(
    FAILURE_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ serverResponse: string }>(),
);

export const __attemptToAttemptActivateAccountViaOta = createAction(
    ATTEMPT_TO_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ jwtToken: string }>(),
);

export const __successfulAttemptActivateAccountViaOta = createAction(
    SUCCESSFUL_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ activateAccountDetails: AttemptFinishSignupResModel }>(),
);

export const __failureAttemptActivateAccountViaOta = createAction(
    FAILURE_ATTEMPT_ACTIVATE_ACCOUNT_VIA_OTA,
    props<{ serverResponse: string }>(),
);

export const __clearServerResponse = createAction(
    CLEAR_SERVER_RESPONSE,
);

export const __clearFinishSignupUserData = createAction(
    CLEAR_FINISH_SIGNUP_USER_DATA,
);

export const __filledFinishSignupResponseMessage = createAction(
    FILLED_FINISH_SIGNUP_RESPONSE_MESSAGE,
    props<{ serverResponse: string }>(),
);

export const __filledFinishSignupJwtToken = createAction(
    FILLED_FINISH_SIGNUP_JWT_TOKEN,
    props<{ jwtToken: string }>(),
);
