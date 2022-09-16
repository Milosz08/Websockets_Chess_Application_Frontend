/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: register-form.model.ts
 * Last modified: 12/09/2022, 17:45
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

export class SignupFormModel {
    nickname: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    secondEmailAddress: string;
    birthDateDay: number;
    birthDateMonth: number;
    birthDateYear: number;
    countryName: string;
    gender: string;
    password: string;
    passwordRepeat: string;
    hasNewsletterAccept: boolean;
    hasPrivacyPolicyAccept: boolean;

    constructor(
        nickname: string, firstName: string, lastName: string, emailAddress: string, secondEmailAddress: string,
        birthDateDay: number, birthDateMonth: number, birthDateYear: number, countryName: string, gender: string,
        password: string, passwordRepeat: string, hasNewsletterAccept: boolean, hasPrivacyPolicyAccept: boolean,
    ) {
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.secondEmailAddress = secondEmailAddress;
        this.birthDateDay = birthDateDay;
        this.birthDateMonth = birthDateMonth;
        this.birthDateYear = birthDateYear;
        this.countryName = countryName;
        this.gender = gender;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
        this.hasNewsletterAccept = hasNewsletterAccept;
        this.hasPrivacyPolicyAccept = hasPrivacyPolicyAccept;
    };
}
