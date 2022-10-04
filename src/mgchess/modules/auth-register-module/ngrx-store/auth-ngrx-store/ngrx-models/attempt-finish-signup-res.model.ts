/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: attempt-finish-signup-account-data-res.model.ts
 * Last modified: 25/09/2022, 03:56
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

export class AttemptFinishSignupResModel {
    nickname: string;
    fullName: string;
    photoUrl: string;
    initials: string;
    dataFilled: boolean;
    responseMessage: string;
    authSupplier: string;
    jwtToken: string;
    userEmailAddresses: Array<EmailHashWithNormalModel>;

    constructor(
        nickname: string, fullName: string, photoUrl: string, initials: string, dataFilled: boolean,
        responseMessage: string, authSupplier: string, userEmailAddresses: Array<EmailHashWithNormalModel>,
        jwtToken: string,
    ) {
        this.nickname = nickname;
        this.fullName = fullName;
        this.photoUrl = photoUrl;
        this.initials = initials;
        this.dataFilled = dataFilled;
        this.responseMessage = responseMessage;
        this.authSupplier = authSupplier;
        this.userEmailAddresses = userEmailAddresses;
        this.jwtToken = jwtToken;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class EmailHashWithNormalModel {
    hash: string;
    normal: string;

    constructor(hash: string, normal: string) {
        this.hash = hash;
        this.normal = normal;
    }
}
