/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: angular-form.validator.ts
 * Last modified: 14/09/2022, 03:58
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
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class AngularFormValidator {

    passwordMismatchValidate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get("password");
        const passwordRepeat = control.get("passwordRepeat");
        return password && passwordRepeat && password.value !== passwordRepeat.value && !passwordRepeat.errors ? {
            [ValidatorConstraint.PASSWORDS_ARE_NOT_THE_SAME]: true,
        } : null;
    };

    twoEmailAddressesAreNotEqualsValidate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const emailAddress = control.get("emailAddress");
        const secondEmailAddress = control.get("secondEmailAddress");
        if (!emailAddress || !secondEmailAddress) return {};
        return (
            emailAddress.value !== "" && secondEmailAddress.value !== "" &&
            emailAddress.value === secondEmailAddress.value && !secondEmailAddress.errors ? {
                [ValidatorConstraint.EMAIL_ADDRESSES_ARE_THE_SAME]: true,
            } : null
        );
    };
}

//----------------------------------------------------------------------------------------------------------------------

export enum ValidatorConstraint {
    PASSWORDS_ARE_NOT_THE_SAME = "passwordSAreNotTheSame",
    EMAIL_ADDRESSES_ARE_THE_SAME = "emailAddressesAreTheSame",
}
