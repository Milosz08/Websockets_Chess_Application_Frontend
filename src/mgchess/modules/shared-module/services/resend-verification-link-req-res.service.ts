/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: resend-verification-link-req-res.service.ts
 * Last modified: 10/10/2022, 16:07
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
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { HttpEndpointsHelper } from "../../../http-request-helpers/http-endpoints.helper";
import { SimpleMessageResponseModel } from "../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ResendVerificationLinkReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    resendEmailForUnsubscribeNewsletter(emailAddress: string): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.NEWSLETTER_UNSUBSCRIBE_RESEND_EMAIL,
            { emailAddress },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    resendEmailForActivateAccount(emailAddress: string): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.ATTEMPT_FINISH_SIGNUP_RESEND_EMAIL,
            { emailAddress },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    resendEmailForChangePassword(emailAddress: string): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.CHANGE_PASSWORD_RESEND_EMAIL,
            { emailAddress },
        );
    };
}
