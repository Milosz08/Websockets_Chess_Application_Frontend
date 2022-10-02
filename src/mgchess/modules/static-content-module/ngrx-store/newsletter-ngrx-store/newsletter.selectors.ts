/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: newsletter.selectors.ts
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

import { createFeatureSelector, createSelector } from "@ngrx/store";

import { newsletterNgrxStore } from "./newsletter.reducer";
import { NewsletterStateTypes } from "./newsletter.initial";
import { EmailAndTokenResModel } from "./ngrx-models/email-and-token-res.model";

//----------------------------------------------------------------------------------------------------------------------

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(createFeatureSelector<NewsletterStateTypes>(newsletterNgrxStore.reducerName), payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_tokenFormVisibility = selectorWithInjectedStore(state =>
    state.isTokenFormActive,
);

export const sel_successfullValidToken = selectorWithInjectedStore(state =>
    state.tokenServerResponse.responseMessage !== "" && !state.tokenServerResponse.responseError
);

export const sel_emailTokenResponse = selectorWithInjectedStore(state =>
    new EmailAndTokenResModel(state.emailServerResponse, state.tokenServerResponse),
);

