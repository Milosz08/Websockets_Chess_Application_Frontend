/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: validator-pattern.constants.ts
 * Last modified: 08/09/2022, 22:42
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

import { Injectable } from "@angular/core";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ValidatorPatternConstants {
    readonly OTA_TOKEN_REGEX = "^[a-zA-Z0-9]{10}$" as const;
    readonly NICKNAME_REGEX = "^[a-z0-9]{5,30}" as const;
    readonly USERNAME_REGEX = "^[a-zA-Z]{2,30}$" as const;
    readonly PASSWORD_REGEX = "^[a-zA-Z0-9!@#$%&*]{8,30}$" as const;
}
