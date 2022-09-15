/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: global.reducer.ts
 * Last modified: 15/09/2022, 21:33
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

import { initialGlobalState } from "./global.initial";
import { ComboBoxType } from "../../types/combo-box.type";
import { ComboListStateModel } from "./ngrx-models/combo-list-state.model";

import * as NgrxAction from "./global.actions";

//----------------------------------------------------------------------------------------------------------------------

const _globalReducer = createReducer(
    initialGlobalState,
    on(NgrxAction.__closeComboList, state => {
        return { ...state,
            comboListState: new ComboListStateModel(false, ComboBoxType.NONE),
        };
    }),
    on(NgrxAction.__toggleComboList, (state, action) => {
        if (state.comboListState.type === action.comboType) {
            return { ...state,
                comboListState: new ComboListStateModel(!state.comboListState.isOpen, action.comboType),
            };
        }
        return { ...state,
            comboListState: new ComboListStateModel(true, action.comboType),
        };
    }),
);

//----------------------------------------------------------------------------------------------------------------------

export const globalNgrxStore = {
    reducerName: "globalReducer" as const,
    reducerFunc: function globalReducer(state: any, action: any) {
        return _globalReducer(state, action);
    },
}
