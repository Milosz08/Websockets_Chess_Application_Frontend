/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: register-data-req.model.ts
 * Last modified: 12/09/2022, 17:48
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

import { SignupFormModel } from "../../../models/signup-form.model";

//----------------------------------------------------------------------------------------------------------------------

export class SignupRequestModel {
    nickname: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    secondEmailAddress: string;
    birthDate: string;
    countryName: string;
    gender: string;
    password: string;
    passwordRepeat: string;

    constructor(registerForm: SignupFormModel) {
        const { birthDateDay, birthDateMonth, birthDateYear } = registerForm;
        this.nickname = registerForm.nickname;
        this.firstName = registerForm.firstName;
        this.lastName = registerForm.lastName;
        this.emailAddress = registerForm.emailAddress;
        this.secondEmailAddress = registerForm.secondEmailAddress;
        this.birthDate = `${this.addBeforePad(birthDateDay!)}/${this.addBeforePad(birthDateMonth!)}/${birthDateYear}`;
        this.countryName = registerForm.countryName!;
        this.gender = registerForm.gender!;
        this.password = registerForm.password;
        this.passwordRepeat = registerForm.passwordRepeat;
    };

    private addBeforePad(value: number): string {
        return value.toString().padStart(2, "0");
    };
}
