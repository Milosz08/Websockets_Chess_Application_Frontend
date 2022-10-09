/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-password.actions.ts
 * Last modified: 09/10/2022, 18:03
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

import { ChangeForgottenPasswordReqModel } from "./ngrx-models/change-forgotten-password-req.model";
import { ForgotPasswordMiddlewareDataModel } from "./ngrx-models/forgot-password-middleware-data.model";
import { ChangePasswordUserDetailsResModel } from "./ngrx-models/change-password-user-details-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_TO_SEND_REQUEST_TO_CHANGE_PASSWORD = "[CHANGE PASSWORD] ATTEMPT TO SEND REQUEST TO CHANGE PASSWORD" as const;
const SUCCESSFUL_SEND_REQUEST_TO_CHANGE_PASSWORD = "[CHANGE PASSWORD] SUCCESSFUL SEND REQUEST TO CHANGE PASSWORD" as const;
const FAILURE_SEND_REQUEST_TO_CHANGE_PASSWORD = "[CHANGE PASSWORD] FAILURE SEND REQUEST TO CHANGE PASSWORD" as const;

const ATTEMPT_TO_VALIDATE_CHANGE_PASSWORD_VIA_OTA = "[CHANGE PASSWORD] ATTEMPT TO VALIDATE CHANGE PASSWORD VIA OTA" as const;
const SUCCESSFUL_VALIDATE_CHANGE_PASSWORD_VIA_OTA = "[CHANGE PASSWORD] SUCCESSFUL VALIDATE CHANGE PASSWORD VIA OTA" as const;
const FAILURE_VALIDATE_CHANGE_PASSWORD_VIA_OTA = "[CHANGE PASSWORD] FAILURE VALIDATE CHANGE PASSWORD VIA OTA" as const;

const ATTEMPT_TO_VALIDATE_JWT_FROM_CHANGE_PASSWORD = "[CHANGE PASSWORD] ATTEMPT TO VALIDATE JWT FROM CHANGE PASSWORD" as const;
const SUCCESSFUL_VALIDATE_JWT_FROM_CHANGE_PASSWORD = "[CHANGE PASSWORD] SUCCESSFUL VALIDATE JWT FROM CHANGE PASSWORD" as const;
const FAILURE_VALIDATE_JWT_FROM_CHANGE_PASSWORD = "[CHANGE PASSWORD] FAILURE VALIDATE JWT FROM CHANGE PASSWORD" as const;

const ATTEMPT_TO_CHANGE_FORGOTTEN_PASSWORD = "[CHANGE PASSWORD] ATTEMPT TO CHANGE FORGOTTEN PASSWORD" as const;
const SUCCESSFUL_CHANGE_FORGOTTEN_PASSWORD = "[CHANGE PASSWORD] SUCCESSFUL CHANGE FORGOTTEN PASSWORD" as const;
const FAILURE_CHANGE_FORGOTTEN_PASSWORD = "[CHANGE PASSWORD] FAILURE CHANGE FORGOTTEN PASSWORD" as const;

const CLEAR_CHANGE_PASSWORD_DATA = "[CHANGE PASSWORD] CLEAR CHANGE PASSWORD DATA" as const;
const CLEAR_SERVER_RESPONSE_DATA = "[CHANGE PASSWORD] CLEAR SERVER RESPONSE DATA" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToSendRequestToChangePassword = createAction(
    ATTEMPT_TO_SEND_REQUEST_TO_CHANGE_PASSWORD,
    props<{ usernameEmail: string }>(),
);

export const __successfulSendRequestToChangePassword = createAction(
    SUCCESSFUL_SEND_REQUEST_TO_CHANGE_PASSWORD,
    props<{ serverResponse: ForgotPasswordMiddlewareDataModel }>(),
);

export const __failureSendRequestToChangePassword = createAction(
    FAILURE_SEND_REQUEST_TO_CHANGE_PASSWORD,
    props<{ serverResponse: string }>(),
);

export const __attemptToValidateChangePasswordViaOta = createAction(
    ATTEMPT_TO_VALIDATE_CHANGE_PASSWORD_VIA_OTA,
    props<{ otaToken: string }>(),
);

export const __successfulValidateChangePasswordViaOta = createAction(
    SUCCESSFUL_VALIDATE_CHANGE_PASSWORD_VIA_OTA,
    props<{ jwtToken: string }>(),
);

export const __failureValidateChangePasswordViaOta = createAction(
    FAILURE_VALIDATE_CHANGE_PASSWORD_VIA_OTA,
    props<{ serverResponse: string }>(),
);

export const __attemptToValidateJwtFromChangePassword = createAction(
    ATTEMPT_TO_VALIDATE_JWT_FROM_CHANGE_PASSWORD,
    props<{ jwtToken: string }>(),
);

export const __successfulValidateJwtFromChangePassword = createAction(
    SUCCESSFUL_VALIDATE_JWT_FROM_CHANGE_PASSWORD,
    props<{ userDetails: ChangePasswordUserDetailsResModel }>(),
);

export const __failureValidateJwtFromChangePassword = createAction(
    FAILURE_VALIDATE_JWT_FROM_CHANGE_PASSWORD,
    props<{ serverResponse: string }>(),
);

export const __attemptToChangeForgottenPassword = createAction(
    ATTEMPT_TO_CHANGE_FORGOTTEN_PASSWORD,
    props<{ credentials: ChangeForgottenPasswordReqModel, jwtToken: string }>(),
);

export const __successfulChangeForgottenPassword = createAction(
    SUCCESSFUL_CHANGE_FORGOTTEN_PASSWORD,
    props<{ serverResponse: string }>(),
);

export const __failureChangeForgottenPassword = createAction(
    FAILURE_CHANGE_FORGOTTEN_PASSWORD,
    props<{ serverResponse: string }>(),
);

export const __clearChangePasswordData = createAction(
    CLEAR_CHANGE_PASSWORD_DATA,
);

export const __clearServerResponseData = createAction(
    CLEAR_SERVER_RESPONSE_DATA,
);
