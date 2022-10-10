/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: gfx.actions.ts
 * Last modified: 16/09/2022, 17:59
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
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] ACTIVE GLOBAL SUSPENSE LOADER";
const PREPEND_INACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] PREPEND INACTIVE GLOBAL SUSPENSE LOADER";
const INACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] INACTIVE GLOBAL SUSPENSE LOADER";

const ACTIVE_SUSPENSE_LOADER = "[GFX] ACTIVE SUSPENSE LOADER";
const INACTIVE_SUSPENSE_LOADER = "[GFX] INACTIVE SUSPENSE LOADER";

const ATTEMPT_RESEND_EMAIL_FOR_UNSUBSCRIBE_NEWSLETTER = "[GFX] ATTEMPT RESEND EMAIL FOR UNSUBSCRIBE NEWSLETTER";
const ATTEMPT_RESEND_EMAIL_FOR_ACTIVATE_ACCOUNT = "[GFX] ATTEMPT RESEND EMAIL FOR ACTIVATE ACCOUNT";
const ATTEMPT_RESEND_EMAIL_FOR_CHANGE_PASSWORD = "[GFX] ATTEMPT RESEND EMAIL FOR CHANGE PASSWORD";

const OPEN_GLOBAL_MESSAGE_MODAL = "[GFX] OPEN GLOBAL MESSAGE MODAL";
const CLOSE_GLOBAL_MESSAGE_MODAL = "[GFX] CLOSE GLOBAL MESSAGE MODAL";

//----------------------------------------------------------------------------------------------------------------------

export const __activeGlobalSuspense = createAction(
    ACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __prependInactiveGlobalSuspense = createAction(
    PREPEND_INACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __inactiveGlobalSuspense = createAction(
    INACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __activeSuspense = createAction(
    ACTIVE_SUSPENSE_LOADER,
    props<{ for: SuspenseLoader }>(),
);

export const __inactiveSuspense = createAction(
    INACTIVE_SUSPENSE_LOADER,
);

export const __attemptResendEmailForUnsubscribeNewsletter = createAction(
    ATTEMPT_RESEND_EMAIL_FOR_UNSUBSCRIBE_NEWSLETTER,
    props<{ emailAddress: string }>(),
);

export const __attemptResendEmailForActivateAccount = createAction(
    ATTEMPT_RESEND_EMAIL_FOR_ACTIVATE_ACCOUNT,
    props<{ emailAddress: string }>(),
);

export const __attemptResendEmailForChangePassword = createAction(
    ATTEMPT_RESEND_EMAIL_FOR_CHANGE_PASSWORD,
    props<{ emailAddress: string }>(),
);

export const __openGlobalMessageModal = createAction(
    OPEN_GLOBAL_MESSAGE_MODAL,
    props<{ message: string, ifError: boolean }>(),
);

export const __closeGlobalMessageModal = createAction(
    CLOSE_GLOBAL_MESSAGE_MODAL,
);
