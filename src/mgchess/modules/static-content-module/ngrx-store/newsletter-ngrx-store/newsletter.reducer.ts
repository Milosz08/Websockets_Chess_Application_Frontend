/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: newsletter.reducer.ts
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

import { createReducer, on } from "@ngrx/store";

import { initialNewsletterState } from "./newsletter.initial";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { SuspenseLoader, SuspenseLoaderResModel } from "../../../../models/suspense-loader-res.model";

import * as NgrxAction from "./newsletter.actions";

//----------------------------------------------------------------------------------------------------------------------

const _newsletterReducer = createReducer(
    initialNewsletterState,
    on(NgrxAction.__changeUnsubscribeTokenFormVisibility, (state, action) => {
        return { ...state,
            isTokenFormActive: action.formVisibility,
        };
    }),
    on(NgrxAction.__cleanupEmailServerResponse, state => {
        return { ...state,
            emailServerResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
    on(NgrxAction.__cleanupTokenServerResponse, state => {
        return { ...state,
            tokenServerResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
    on(NgrxAction.__successfulAttemptToUnsubscribeNewsletter, (state, action) => {
        return { ...state,
            emailServerResponse: new SimpleMessageResWithErrorModel(action.serverResponse, false),
            removingEmail: action.userEmail,
            isTokenFormActive: true,
        };
    }),
    on(NgrxAction.__failureAttemptToUnsubscribeNewsletter, (state, action) => {
        return { ...state,
            emailServerResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__successfulUnsubscribeNewsletter, (state, action) => {
        return { ...state,
            tokenServerResponse: new SimpleMessageResWithErrorModel(action.serverResponse, false),
            removingEmail: "",
        };
    }),
    on(NgrxAction.__failureUnsubscribeNewsletter, (state, action) => {
        return { ...state,
            tokenServerResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__initialClearAllState, state => {
        return { ...state,
            isTokenFormActive: false,
            removingEmail: "",
            emailServerResponse: new SimpleMessageResWithErrorModel("", false),
            tokenServerResponse: new SimpleMessageResWithErrorModel("", false),
            suspenseLoader: new SuspenseLoaderResModel(false, SuspenseLoader.INACTIVE),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const newsletterNgrxStore = {
    reducerName: "newsletterReducer" as const,
    reducerFunc: function newsletterReducer(state: any, action: any) {
        return _newsletterReducer(state, action);
    },
}
