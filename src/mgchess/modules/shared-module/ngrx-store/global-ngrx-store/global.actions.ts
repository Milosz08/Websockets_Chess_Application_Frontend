/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: global.actions.ts
 * Last modified: 15/09/2022, 21:32
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

import { createAction } from "@ngrx/store";

const SUSPENSE_LOADING_STATUS_ACTIVE = "[GLOBAL] SUSPENSE LOADING STATUS ACTIVE";
const SUSPENSE_LOADING_PREPEND_INACTIVE = "[GLOBAL] SUSPENSE LOADING PREPEND INACTIVE";
const SUSPENSE_LOADING_STATUS_INACTIVE = "[GLOBAL] SUSPENSE LOADING STATUS INACTIVE";

//----------------------------------------------------------------------------------------------------------------------

export const __setSuspenseLoadingStatusActive = createAction(
    SUSPENSE_LOADING_STATUS_ACTIVE,
);

export const __setSuspenseLoadingPrependInactive = createAction(
    SUSPENSE_LOADING_PREPEND_INACTIVE,
);

export const __setSuspenseLoadingStatusInactive = createAction(
    SUSPENSE_LOADING_STATUS_INACTIVE,
);
