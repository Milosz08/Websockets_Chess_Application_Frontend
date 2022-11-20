/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: gfx.reducer.ts
 * Last modified: 16/09/2022, 17:44
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

import { initialGfxState } from "./gfx.initial";
import { GlobalResponseModalModel } from "./ngrx-models/global-response-modal.model";
import { ActionWindowModalModel, ModalWindowType } from "./ngrx-models/action-window-modal.model";
import { SuspenseLoader, SuspenseLoaderResModel } from "../../../../models/suspense-loader-res.model";

import * as NgrxAction from "./gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

const _gfxReducer = createReducer(
    initialGfxState,
    on(NgrxAction.__activeGlobalSuspense, state => {
        return { ...state,
            globalSuspenseActive: true,
        };
    }),
    on(NgrxAction.__inactiveGlobalSuspense, state => {
        return { ...state,
            globalSuspenseActive: false,
        };
    }),
    on(NgrxAction.__activeSuspense, (state, action) => {
        return { ...state,
            suspenseStatus: new SuspenseLoaderResModel(true, action.for),
        };
    }),
    on(NgrxAction.__inactiveSuspense, state => {
        return { ...state,
            suspenseStatus: new SuspenseLoaderResModel(false, SuspenseLoader.INACTIVE),
        };
    }),
    on(NgrxAction.__openGlobalMessageModal, (state, action) => {
        return { ...state,
            globalResponseModal: new GlobalResponseModalModel(true, action.message, action.ifError),
        };
    }),
    on(NgrxAction.__closeGlobalMessageModal, state => {
        return { ...state,
            globalResponseModal: new GlobalResponseModalModel(false, "", false),
        };
    }),
    on(NgrxAction.__openActionWindowModal, (state, action) => {
        return { ...state,
            actionWindowModal: new ActionWindowModalModel(true, action.modalType),
        };
    }),
    on(NgrxAction.__closeActionWindowModal, state => {
        return { ...state,
            actionWindowModal: new ActionWindowModalModel(false, ModalWindowType.MODAL_INACTIVE),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const gfxNgrxStore = {
    reducerName: "gfxReducer" as const,
    reducerFunc: function gfxReducer(state: any, action: any) {
        return _gfxReducer(state, action);
    },
}
