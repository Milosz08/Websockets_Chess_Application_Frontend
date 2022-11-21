/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-images.actions.ts
 * Last modified: 20.11.2022, 23:11
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

//----------------------------------------------------------------------------------------------------------------------

const ATTEMPT_TO_CHANGE_USER_PROFILE_IMAGE = "[USER IMAGES] ATTEMPT TO CHANGE USER PROFILE IMAGE" as const;
const ATTEMPT_TO_DELETE_USER_PROFILE_IMAGE = "[USER IMAGES] ATTEMPT TO DELETE USER PROFILE IMAGE" as const;
const ATTEMPT_TO_CHANGE_USER_BANNER_IMAGE = "[USER IMAGES] ATTEMPT TO CHANGE USER BANNER IMAGE" as const;
const ATTEMPT_TO_DELETE_USER_BANNER_IMAGE = "[USER IMAGES] ATTEMPT TO DELETE USER BANNER IMAGE" as const;

const SUCCESSFUL_SET_USER_IMAGE = "[USER IMAGES] SUCCESSFUL SET USER IMAGE" as const;
const FAILURE_SET_USER_IMAGE = "[USER IMAGES] FAILURE SET USER IMAGE" as const;
const CLEAR_SERVER_RESPONSE = "[USER IMAGES] CLEAR SERVER RESPONSE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __attemptToChangeUserProfileImage = createAction(
    ATTEMPT_TO_CHANGE_USER_PROFILE_IMAGE,
    props<{ image: File }>(),
);

export const __attemptToDeleteUserProfileImage = createAction(
    ATTEMPT_TO_DELETE_USER_PROFILE_IMAGE,
);

export const __attemptToChangeUserBannerImage = createAction(
    ATTEMPT_TO_CHANGE_USER_BANNER_IMAGE,
    props<{ image: File }>(),
);

export const __attemptToDeleteUserBannerImage = createAction(
    ATTEMPT_TO_DELETE_USER_BANNER_IMAGE,
);

export const __successfulSetUserImage = createAction(
    SUCCESSFUL_SET_USER_IMAGE,
    props<{ responseMessage: string }>(),
);

export const __failureSetUserImage = createAction(
    FAILURE_SET_USER_IMAGE,
    props<{ responseMessage: string }>(),
);

export const __clearServerResponse = createAction(
    CLEAR_SERVER_RESPONSE,
);
