/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth.reducer.ts
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

import { createReducer, on } from "@ngrx/store";

import { initialAuthState } from "./auth.initial";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { SuspenseLoader, SuspenseLoaderResModel } from "../../../../models/suspense-loader-res.model";

import * as NgrxAction from "./auth.actions";

//----------------------------------------------------------------------------------------------------------------------

const _authReducer = createReducer(
    initialAuthState,
    on(NgrxAction.__successfulLoginViaLocal, (state, action) => {
        return { ...state,
            userCredentialsData: action.credentialsData,
        };
    }),
    on(NgrxAction.__failureLoginViaLocal, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__cleanServerResponse, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
    on(NgrxAction.__activeSuspense, (state, action) => {
        return { ...state,
            suspenseLoader: new SuspenseLoaderResModel(true, action.for),
        };
    }),
    on(NgrxAction.__disactiveSuspense, state => {
        return { ...state,
            suspenseLoader: new SuspenseLoaderResModel(false, SuspenseLoader.INACTIVE),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const authNgrxStore = {
    reducerName: "authReducer" as const,
    reducerFunc: function authReducer(state: any, action: any) {
        return _authReducer(state, action);
    },
}
