/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: ngrx-store.types.ts
 * Last modified: 04/09/2022, 16:40
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

import { gfxNgrxStore } from "../modules/shared-module/ngrx-store/gfx-ngrx-store/gfx.reducer";
import { authNgrxStore } from "../modules/auth-register-module/ngrx-store/auth-ngrx-store/auth.reducer";
import { sessionNgrxStore } from "../modules/shared-module/ngrx-store/session-ngrx-store/session.reducer";
import { newsletterNgrxStore } from "../modules/static-content-module/ngrx-store/newsletter-ngrx-store/newsletter.reducer";

import { GfxStateTypes } from "../modules/shared-module/ngrx-store/gfx-ngrx-store/gfx.initial";
import { AuthStateTypes } from "../modules/auth-register-module/ngrx-store/auth-ngrx-store/auth.initial";
import { SessionStateTypes } from "../modules/shared-module/ngrx-store/session-ngrx-store/session.initial";
import { NewsletterStateTypes } from "../modules/static-content-module/ngrx-store/newsletter-ngrx-store/newsletter.initial";

//----------------------------------------------------------------------------------------------------------------------

export type NewsletterReducerType = {
    [newsletterNgrxStore.reducerName]: NewsletterStateTypes,
};

export type AuthReducerType = {
    [authNgrxStore.reducerName]: AuthStateTypes,
};

export type GlobalReducerType = {
    [gfxNgrxStore.reducerName]: GfxStateTypes,
};

export type SessionWithGfxCombinedReducerTypes = {
    [sessionNgrxStore.reducerName]: SessionStateTypes,
    [gfxNgrxStore.reducerName]: GfxStateTypes,
};

export type SessionWithAuthCombinedReducerTypes = {
    [sessionNgrxStore.reducerName]: SessionStateTypes,
    [authNgrxStore.reducerName]: AuthStateTypes,
};

export type AuthWithGfxCombinedReducerTypes = {
    [authNgrxStore.reducerName]: AuthStateTypes,
    [gfxNgrxStore.reducerName]: GfxStateTypes,
};

export type SessionReducerType = {
    [authNgrxStore.reducerName]: SessionStateTypes,
};
