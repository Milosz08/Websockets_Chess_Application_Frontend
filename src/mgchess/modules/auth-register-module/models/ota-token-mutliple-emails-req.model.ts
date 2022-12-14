/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: ota-token-req.model.ts
 * Last modified: 01/10/2022, 12:52
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

export class OtaTokenMutlipleEmailsReqModel {
    token: string;
    emailAddresses: Array<string>;

    //------------------------------------------------------------------------------------------------------------------

    constructor(token: string, emailAddresses: Array<string>) {
        this.token = token;
        this.emailAddresses = emailAddresses;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class OtaTokenNicknameEmailReqModel {
    token: string;
    nicknameEmail: string;

    //------------------------------------------------------------------------------------------------------------------

    constructor(token: string, nicknameEmail: string) {
        this.token = token;
        this.nicknameEmail = nicknameEmail;
    };
}
