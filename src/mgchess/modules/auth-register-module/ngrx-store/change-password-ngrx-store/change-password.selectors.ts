/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-password.selectors.ts
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

import { createFeatureSelector, createSelector } from "@ngrx/store";

import { changePasswordNgrxStore } from "./change-password.reducer";
import { ChangePasswordStateTypes } from "./change-password.initial";
import { EmailHashWithNormalModel } from "../auth-ngrx-store/ngrx-models/attempt-finish-signup-res.model";

//----------------------------------------------------------------------------------------------------------------------

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(createFeatureSelector<ChangePasswordStateTypes>(changePasswordNgrxStore.reducerName), payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_serverResponse = selectorWithInjectedStore(({ serverResponse }) =>
    serverResponse,
);

export const sel_forgotPasswordServerResponse = selectorWithInjectedStore(({ forgotPasswordResponse }) =>
    Boolean(forgotPasswordResponse) ? forgotPasswordResponse.forgotPasswordResponseMessage : "",
);

export const sel_changePasswordUserDetails = selectorWithInjectedStore(({ changePasswordUserDetails }) =>
    changePasswordUserDetails,
);

export const sel_changePasswordResponseActive = selectorWithInjectedStore(({ changePasswordResponseActive }) =>
    changePasswordResponseActive,
);

export const sel_changePasswordUserEmails = selectorWithInjectedStore(({ forgotPasswordResponse }) =>
    Boolean(forgotPasswordResponse)
        ? forgotPasswordResponse.emailAddresses.map((e: EmailHashWithNormalModel) => e.hash) : [],
);

export const sel_changePasswordPrimaryUserEmail = selectorWithInjectedStore(({ forgotPasswordResponse }) =>
    Boolean(forgotPasswordResponse) ? forgotPasswordResponse.primaryUserEmailAddress : "",
);
