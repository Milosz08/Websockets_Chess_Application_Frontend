/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: change-password.reducer.ts
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

import { createReducer, on } from "@ngrx/store";

import { initialChangePasswordState } from "./change-password.initial";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import * as NgrxAction from "./change-password.actions";

//----------------------------------------------------------------------------------------------------------------------

const _changePasswordReducer = createReducer(
    initialChangePasswordState,
    on(NgrxAction.__successfulSendRequestToChangePassword, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse.forgotPasswordResponseMessage, false),
            forgotPasswordResponse: action.serverResponse,
        };
    }),
    on(NgrxAction.__failureSendRequestToChangePassword, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__failureValidateChangePasswordViaOta, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__successfulValidateJwtFromChangePassword, (state, action) => {
        return { ...state,
            changePasswordUserDetails: action.userDetails,
            changePasswordResponseActive: true,
        };
    }),
    on(NgrxAction.__failureValidateJwtFromChangePassword, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
            changePasswordResponseErrorMessage: action.serverResponse,
        };
    }),
    on(NgrxAction.__successfulChangeForgottenPassword, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, false),
        };
    }),
    on(NgrxAction.__failureChangeForgottenPassword, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__clearServerResponseData, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
    on(NgrxAction.__clearChangePasswordData, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
            changePasswordResponseErrorMessage: "",
            changePasswordResponseActive: false,
            forgotPasswordResponse: null,
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const changePasswordNgrxStore = {
    reducerName: "changePasswordReducer" as const,
    reducerFunc: function changePasswordReducer(state: any, action: any) {
        return _changePasswordReducer(state, action);
    },
}
