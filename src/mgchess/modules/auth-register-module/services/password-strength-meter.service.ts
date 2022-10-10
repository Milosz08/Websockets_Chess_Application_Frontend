/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: password-strength-meter.service.ts
 * Last modified: 14/09/2022, 05:34
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
export class PasswordStrengthMeterService {

    private readonly _strongRegex: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
    private readonly _mediumRegex: RegExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))");

    //------------------------------------------------------------------------------------------------------------------

    computePasswordPower(password: string): PasswordStrength {
        let strength: PasswordStrength;
        if (password === "") {
            strength = new PasswordStrength(0, PasswordPower.NONE);
        } else if (this._strongRegex.test(password)) {
            strength = new PasswordStrength(3, PasswordPower.STRONG);
        } else if (this._mediumRegex.test(password)) {
            strength = new PasswordStrength(2, PasswordPower.GOOD);
        } else {
            strength = new PasswordStrength(1, PasswordPower.WEAK);
        }
        return strength
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class PasswordStrength {
    value: number;
    name: string;

    constructor(value: number, name: string) {
        this.value = value;
        this.name = name;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export enum PasswordPower {
    NONE = "NONE",
    WEAK = "WEAK",
    GOOD = "GOOD",
    STRONG = "STRONG",
}
