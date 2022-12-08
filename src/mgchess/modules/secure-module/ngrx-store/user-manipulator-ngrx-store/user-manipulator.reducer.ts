/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-manipulator.reducer.ts
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

import { createReducer, on } from "@ngrx/store";

import { initialUserManipulatorState } from "./user-manipulator.initial";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import * as NgrxAction from "./user-manipulator.actions";

//----------------------------------------------------------------------------------------------------------------------

const _userManipulatorReducer = createReducer(
    initialUserManipulatorState,
    on(NgrxAction.__editUserDescriptionVisible, state => {
        return { ...state,
            changeDescriptionIsOpen: true,
        };
    }),
    on(NgrxAction.__editUserDescriptionHidden, state => {
        return { ...state,
            changeDescriptionIsOpen: false,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
    on(NgrxAction.__failureEditUserDescription, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__failureRemoveUserDescription, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.serverResponse, true),
        };
    }),
    on(NgrxAction.__clearServerResponse, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const userManipulatorNgrxStore = {
    reducerName: "userImagesReducer" as const,
    reducerFunc: function userManipulatorReducer(state: any, action: any) {
        return _userManipulatorReducer(state, action);
    },
}
