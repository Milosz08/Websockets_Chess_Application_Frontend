/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: gfx.selectors.ts
 * Last modified: 25/09/2022, 04:20
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

import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";

import { gfxNgrxStore } from "./gfx.reducer";
import { GfxStateTypes } from "./gfx.initial";
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";

//----------------------------------------------------------------------------------------------------------------------

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(createFeatureSelector<GfxStateTypes>(gfxNgrxStore.reducerName), payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_globalSuspenseLoadingStatus = selectorWithInjectedStore(state =>
    state.globalSuspenseActive,
);

export const getCurrActiveSuspense = (ldr: SuspenseLoader): MemoizedSelector<object, any, DefaultProjectorFn<any>> => {
    return selectorWithInjectedStore(({ suspenseStatus }) => (
        suspenseStatus.isSuspenseLoading && suspenseStatus.loadingFor === ldr
    ));
};

export const sel_globalResponseModalData = selectorWithInjectedStore(({ globalResponseModal }) =>
    globalResponseModal,
);

export const sel_windowModalProps = selectorWithInjectedStore(({ actionWindowModal }) =>
    actionWindowModal,
);
