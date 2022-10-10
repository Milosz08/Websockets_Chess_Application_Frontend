/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: forgot-password-middleware-data.model.ts
 * Last modified: 09/10/2022, 17:57
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

import { EmailAddressesChangePasswordResModel } from "./email-addresses-change-password-res.model";

//----------------------------------------------------------------------------------------------------------------------

export class ForgotPasswordMiddlewareDataModel {
    primaryUserEmailAddress: string;
    forgotPasswordResponseMessage: string;
    emailAddresses: Array<string>;
    userNicknameEmail: string;

    //------------------------------------------------------------------------------------------------------------------

    constructor(res: EmailAddressesChangePasswordResModel, userNicknameEmail: string) {
        this.primaryUserEmailAddress = res.primaryEmailAddress;
        this.forgotPasswordResponseMessage = res.responseMessage;
        this.emailAddresses = res.emailAddresses;
        this.userNicknameEmail = userNicknameEmail;
    };
}
