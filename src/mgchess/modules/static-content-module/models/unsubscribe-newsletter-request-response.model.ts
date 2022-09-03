/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: unsubscribe-newsletter-request-response.model.ts
 * Last modified: 03/09/2022, 18:21
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

export class AttemptUnsubscribeNewsletterReq {
    emailAddress: string;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class UnsubscribeNewsletterFormReq {
    token: string;

    constructor(token: string) {
        this.token = token;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class UnsubscribeNewsletterReq extends UnsubscribeNewsletterFormReq {
    isBearer: boolean;
    emailAddress: string;

    constructor(token: string, emailAddress: string, isBearer: boolean) {
        super(token);
        this.isBearer = isBearer;
        this.emailAddress = emailAddress;
    };
}
