/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: newsletter.actions.ts
 * Last modified: 04/09/2022, 16:19
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
import { UnsubscribeNewsletterEmailReq, UnsubscribeNewsletterViaOtaReq } from "./ngrx-models/unsubscribe-newsletter-req-res.model";

//----------------------------------------------------------------------------------------------------------------------

const CHANGE_UNSUBSCRIBE_TOKEN_FORM_VISIBILITY = "[NEWSLETTER] CHANGE UNSUBSCRIBE TOKEN FORM VISIBILITY" as const;
const CLEANUP_EMAIL_SERVER_RESPONSE = "[NEWSLETTER] CLEANUP EMAIL SERVER RESPONSE" as const;
const CLEANUP_TOKEN_SERVER_RESPONSE = "[NEWSLETTER] CLEANUP TOKEN SERVER RESPONSE" as const;

const ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] ATTEMPT TO UNSUBSCRIBE NEWSLETTER" as const;
const SUCCESSFUL_ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] SUCCESSFUL ATTEMPT TO UNSUBSCRIBE NEWSLETTER" as const;
const FAILURE_ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] FAILURE ATTEMPT TO UNSUBSCRIBE NEWSLETTER" as const;

const UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] UNSUBSCRIBE NEWSLETTER" as const;
const SUCCESSFUL_UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] SUCCESSFUL UNSUBSCRIBE NEWSLETTER" as const;
const FAILURE_UNSUBSCRIBE_NEWSLETTER = "[NEWSLETTER] FAILURE UNSUBSCRIBE NEWSLETTER" as const;

const UNSUBSCRIBE_NEWSLETTER_VIA_JWT = "[NEWSLETTER] UNSUBSCRIBE NEWSLETTER VIA JWT" as const;
const SUCCESSFUL_UNSUBSCRIBE_NEWSLETTER_VIA_JWT = "[NEWSLETTER] SUCCESSFUL UNSUBSCRIBE NEWSLETTER VIA JWT" as const;
const FAILURE_UNSUBSCRIBE_NEWSLETTER_VIA_JWT = "[NEWSLETTER] FAILURE UNSUBSCRIBE NEWSLETTER VIA JWT" as const;

const ACTIVE_SUSPENSE_LOADER = "[NEWSLETTER] ACTIVE SUSPENSE LOADER" as const;
const INACTIVE_SUSPENSE_LOADER = "[NEWSLETTER] INACTIVE SUSPENSE LOADER" as const;

const INITIAL_CLEAR_ALL_STATE = "[NEWSLETTER] INITIAL CLEAR ALL STATE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __changeUnsubscribeTokenFormVisibility = createAction(
    CHANGE_UNSUBSCRIBE_TOKEN_FORM_VISIBILITY,
    props<{ formVisibility: boolean }>()
);

export const __cleanupEmailServerResponse = createAction(
    CLEANUP_EMAIL_SERVER_RESPONSE,
);

export const __cleanupTokenServerResponse = createAction(
    CLEANUP_TOKEN_SERVER_RESPONSE,
);

export const __attemptToUnsubscribeNewsletter = createAction(
    ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER,
    props<{ emailReq: UnsubscribeNewsletterEmailReq }>(),
);

export const __successfulAttemptToUnsubscribeNewsletter = createAction(
    SUCCESSFUL_ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER,
    props<{ serverResponse: string, userEmail: string }>(),
);

export const __failureAttemptToUnsubscribeNewsletter = createAction(
    FAILURE_ATTEMPT_TO_UNSUBSCRIBE_NEWSLETTER,
    props<{ serverResponse: string }>(),
);

export const __unsubscribeNewsletter = createAction(
    UNSUBSCRIBE_NEWSLETTER,
    props<{ tokenReq: UnsubscribeNewsletterViaOtaReq }>(),
);

export const __successfulUnsubscribeNewsletter = createAction(
    SUCCESSFUL_UNSUBSCRIBE_NEWSLETTER,
    props<{ serverResponse: string }>(),
);

export const __failureUnsubscribeNewsletter = createAction(
    FAILURE_UNSUBSCRIBE_NEWSLETTER,
    props<{ serverResponse: string }>(),
);

export const __unsubscribeNewsletterViaJwt = createAction(
    UNSUBSCRIBE_NEWSLETTER_VIA_JWT,
    props<{ bearerToken: string }>(),
);

export const __successfulUnsubscribeNewsletterViaJwt = createAction(
    SUCCESSFUL_UNSUBSCRIBE_NEWSLETTER_VIA_JWT,
    props<{ serverResponse: string }>(),
);

export const __failureUnsubscribeNewsletterViaJwt = createAction(
    FAILURE_UNSUBSCRIBE_NEWSLETTER_VIA_JWT,
    props<{ serverResponse: string }>(),
);

export const __activeSuspense = createAction(
    ACTIVE_SUSPENSE_LOADER,
    props<{ for: SuspenseLoader }>(),
);

export const __disactiveSuspense = createAction(
    INACTIVE_SUSPENSE_LOADER,
);

export const __initialClearAllState = createAction(
    INITIAL_CLEAR_ALL_STATE,
);
