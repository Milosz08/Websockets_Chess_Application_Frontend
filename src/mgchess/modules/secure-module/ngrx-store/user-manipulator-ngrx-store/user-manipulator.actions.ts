/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-manipulator.actions.ts
 * Last modified: 23.11.2022, 00:01
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
import { ChangeDescriptionFormModel } from "../../models/change-description-form.model";

//----------------------------------------------------------------------------------------------------------------------

const EDIT_USER_DESCRIPTION_VISIBLE = "[USER MANIPULATOR] EDIT USER DESCRIPTION VISIBLE" as const;
const EDIT_USER_DESCRIPTION_HIDDEN = "[USER MANIPULATOR] EDIT USER DESCRIPTION HIDDEN" as const;

const ATTEMPT_TO_EDIT_USER_DESCRIPTION = "[USER MANIPULATOR] ATTEMPT TO EDIT USER DESCRIPTION" as const;
const FAILURE_EDIT_USER_DESCRIPTION = "[USER MANIPULATOR] FAILURE EDIT USER DESCRIPTION" as const;

const ATTEMPT_TO_REMOVE_USER_DESCRIPTION = "[USER MANIPULATOR] ATTEMPT TO REMOVE USER DESCRIPTION" as const;
const FAILURE_REMOVE_USER_DESCRIPTION = "[USER MANIPULATOR] FAILURE REMOVE USER DESCRIPTION" as const;

const CLEAR_SERVER_RESPONSE = "[USER MANIPULATOR] CLEAR SERVER RESPONSE" as const;

//----------------------------------------------------------------------------------------------------------------------

export const __editUserDescriptionVisible = createAction(
    EDIT_USER_DESCRIPTION_VISIBLE,
);

export const __editUserDescriptionHidden = createAction(
    EDIT_USER_DESCRIPTION_HIDDEN,
);

export const __attemptToEditUserDescription = createAction(
    ATTEMPT_TO_EDIT_USER_DESCRIPTION,
    props<{ description: ChangeDescriptionFormModel }>(),
);

export const __failureEditUserDescription = createAction(
    FAILURE_EDIT_USER_DESCRIPTION,
    props<{ serverResponse: string }>(),
);

export const __attemptToRemoveUserDescription = createAction(
    ATTEMPT_TO_REMOVE_USER_DESCRIPTION,
);

export const __failureRemoveUserDescription = createAction(
    FAILURE_REMOVE_USER_DESCRIPTION,
    props<{ serverResponse: string }>(),
);

export const __clearServerResponse = createAction(
    CLEAR_SERVER_RESPONSE,
);
