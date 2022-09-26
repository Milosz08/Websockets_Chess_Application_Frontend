/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: finish-signup-form.model.ts
 * Last modified: 26/09/2022, 01:57
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

export class FinishSignupFormModel {
    birthDateDay: number | null;
    birthDateMonth: number | null;
    birthDateYear: number | null;
    countryName: string | null;
    gender: string | null;
    hasNewsletterAccept: boolean;
    hasPrivacyPolicyAccept: boolean;

    constructor(
        birthDateDay: number | null, birthDateMonth: number | null, birthDateYear: number | null,
        countryName: string | null, gender: string | null, hasNewsletterAccept: boolean, hasPrivacyPolicyAccept: boolean
    ) {
        this.birthDateDay = birthDateDay;
        this.birthDateMonth = birthDateMonth;
        this.birthDateYear = birthDateYear;
        this.countryName = countryName;
        this.gender = gender;
        this.hasNewsletterAccept = hasNewsletterAccept;
        this.hasPrivacyPolicyAccept = hasPrivacyPolicyAccept;
    };

    static getDefaultValues(): FinishSignupFormModel {
        return new FinishSignupFormModel(null, null, null, null, null, false, false);
    };
}
