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
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { UserCredentialsDataResModel } from "./ngrx-models/user-credentials-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_LOGIN_VIA_LOCAL = "[AUTH] ATTEMPT LOGIN VIA LOCAL" as const;
const SUCCESSFUL_LOGIN_VIA_LOCAL = "[AUTH] SUCCESSFUL ATTEMPT LOGIN VIA LOCAL" as const;
const FAILURE_LOGIN_VIA_LOCAL = "[AUTH] FAILURE ATTEMPT LOGIN VIA LOCAL" as const;

const ACTIVE_SUSPENSE_LOADER = "[AUTH] ACTIVE SUSPENSE LOADER" as const;
const INACTIVE_SUSPENSE_LOADER = "[AUTH] INACTIVE SUSPENSE LOADER" as const;

const CLEAN_SERVER_RESPONSE = "[AUTH] CLEAN SERVER RESPONSE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToLoginViaLocal = createAction(
    ATTEMPT_LOGIN_VIA_LOCAL,
    props<{ loginForm: LoginFormModel }>(),
);

export const __successfulLoginViaLocal = createAction(
    SUCCESSFUL_LOGIN_VIA_LOCAL,
    props<{ credentialsData: UserCredentialsDataResModel }>(),
);

export const __failureLoginViaLocal = createAction(
    FAILURE_LOGIN_VIA_LOCAL,
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
