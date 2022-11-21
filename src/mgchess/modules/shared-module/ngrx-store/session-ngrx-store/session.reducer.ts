/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: session.reducer.ts
 * Last modified: 25/09/2022, 04:08
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

import { initialSessionState } from "./session.initial";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import * as NgrxAction from "./session.actions";

//----------------------------------------------------------------------------------------------------------------------

const _sessionReducer = createReducer(
    initialSessionState,
    on(NgrxAction.__successfulLogin, (state, action) => {
        return { ...state,
            isLogged: action.isLogged,
            userCredentialsData: action.credentialsData,
        };
    }),
    on(NgrxAction.__failureLogin, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__successfulLogout, state => {
        return { ...state,
            isLogged: false,
            userCredentialsData: null,
        };
    }),
    on(NgrxAction.__failureLogout, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__successfulRefreshToken, (state, action) => {
        return { ...state,
            userCredentialsData: { ...state.userCredentialsData!,
                jwtToken: action.refreshedData.token,
                refreshToken: action.refreshedData.refreshToken,
            },
        };
    }),
    on(NgrxAction.__failureRefreshToken, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__updateUserProfileImage, (state, action) => {
        return { ...state,
            userCredentialsData: { ...state.userCredentialsData!,
                photoUrl: action.imageUrl,
            },
        };
    }),
    on(NgrxAction.__updateUserBannerImage, (state, action) => {
        return { ...state,
            userCredentialsData: { ...state.userCredentialsData!,
                bannerUrl: action.imageUrl,
            },
        };
    }),
    on(NgrxAction.__clearServerResponse, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const sessionNgrxStore = {
    reducerName: "sessionReducer" as const,
    reducerFunc: function sessionReducer(state: any, action: any) {
        return _sessionReducer(state, action);
    },
}
