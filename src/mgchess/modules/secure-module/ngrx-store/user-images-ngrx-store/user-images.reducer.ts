/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-images.reducer.ts
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

import { createReducer, on } from "@ngrx/store";

import { initialUserImagesState } from "./user-images.initial";

import * as NgrxAction from "./user-images.actions";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

const _userImagesReducer = createReducer(
    initialUserImagesState,
    on(NgrxAction.__successfulSetUserImage, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.responseMessage, false),
        };
    }),
    on(NgrxAction.__failureSetUserImage, (state, action) => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel(action.responseMessage, true),
        };
    }),
    on(NgrxAction.__clearServerResponse, state => {
        return { ...state,
            serverResponse: new SimpleMessageResWithErrorModel("", false),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const userImagesNgrxStore = {
    reducerName: "userImagesReducer" as const,
    reducerFunc: function userImagesReducer(state: any, action: any) {
        return _userImagesReducer(state, action);
    },
}
