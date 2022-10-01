/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: time-converter.helper.ts
 * Last modified: 26/09/2022, 02:28
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

import { SignupFormModel } from "../models/signup-form.model";
import { FinishSignupFormModel } from "../models/finish-signup-form.model";

//----------------------------------------------------------------------------------------------------------------------

export class TimeConverterHelper {

    static generateDateFormat(registerForm: SignupFormModel | FinishSignupFormModel): string {
        const { birthDateDay, birthDateMonth, birthDateYear } = registerForm;
        return `${this.addBeforePad(birthDateDay!)}/${this.addBeforePad(birthDateMonth!)}/${birthDateYear}`;
    }

    private static addBeforePad(value: number): string {
        return value.toString().padStart(2, "0");
    };
}
