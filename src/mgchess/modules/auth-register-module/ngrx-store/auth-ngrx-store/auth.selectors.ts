/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth.selectors.ts
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

import { createFeatureSelector, createSelector } from "@ngrx/store";

import { authNgrxStore } from "./auth.reducer";
import { AuthStateTypes } from "./auth.initial";

//----------------------------------------------------------------------------------------------------------------------

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(createFeatureSelector<AuthStateTypes>(authNgrxStore.reducerName), payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_serverResponse = selectorWithInjectedStore(({ serverResponse }) =>
    serverResponse,
);

export const sel_serverResponseIsEmpty = selectorWithInjectedStore(({ serverResponse }) =>
    serverResponse.responseMessage === "",
);

export const sel_finishSignupUserPhoto = selectorWithInjectedStore(({ finishSignupAccountDetails }) =>
    Boolean(finishSignupAccountDetails) ? finishSignupAccountDetails.photoUrl : "",
);

export const sel_finishSignupUserSupplier = selectorWithInjectedStore(({ finishSignupAccountDetails }) =>
    Boolean(finishSignupAccountDetails) ? finishSignupAccountDetails.authSupplier : "",
);

export const sel_finishSignupUserFullName = selectorWithInjectedStore(({ finishSignupAccountDetails }) =>
    Boolean(finishSignupAccountDetails) ? finishSignupAccountDetails.fullName : "",
);

export const sel_finishSignupUserInitials = selectorWithInjectedStore(({ finishSignupAccountDetails }) =>
    Boolean(finishSignupAccountDetails) ? finishSignupAccountDetails.initials : "",
);

export const sel_isFinishSignupTokenInvalid = selectorWithInjectedStore(({ isFinishSignupFormTokenIsValid }) =>
    !isFinishSignupFormTokenIsValid,
);
