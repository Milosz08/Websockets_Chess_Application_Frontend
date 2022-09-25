/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: gfx.actions.ts
 * Last modified: 16/09/2022, 17:59
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

import { createAction, props } from "@ngrx/store";
import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";

//----------------------------------------------------------------------------------------------------------------------

const ACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] ACTIVE GLOBAL SUSPENSE LOADER";
const PREPEND_INACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] PREPEND INACTIVE GLOBAL SUSPENSE LOADER";
const INACTIVE_GLOBAL_SUSPENSE_LOADER = "[GFX] INACTIVE GLOBAL SUSPENSE LOADER";

const ACTIVE_SUSPENSE_LOADER = "[GFX] ACTIVE SUSPENSE LOADER";
const INACTIVE_SUSPENSE_LOADER = "[GFX] INACTIVE SUSPENSE LOADER";

//----------------------------------------------------------------------------------------------------------------------

export const __activeGlobalSuspense = createAction(
    ACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __prependInactiveGlobalSuspense = createAction(
    PREPEND_INACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __inactiveGlobalSuspense = createAction(
    INACTIVE_GLOBAL_SUSPENSE_LOADER,
);

export const __activeSuspense = createAction(
    ACTIVE_SUSPENSE_LOADER,
    props<{ for: SuspenseLoader }>(),
);

export const __inactiveSuspense = createAction(
    INACTIVE_SUSPENSE_LOADER,
);
