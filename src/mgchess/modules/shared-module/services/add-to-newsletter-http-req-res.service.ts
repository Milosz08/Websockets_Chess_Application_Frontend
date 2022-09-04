/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: add-to-newsletter-http-req-res.service.ts
 * Last modified: 25/08/2022, 22:06
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

import { catchError, map, Observable, of } from "rxjs";
import { RxjsHelper } from "../../../rxjs-helpers/rxjs.helper";

import { ServerReqResHelper } from "../../../http-request-helpers/server-req-res.helper";
import { HttpEndpointsHelper } from "../../../http-request-helpers/http-endpoints.helper";

import { NewsletterRequestModel } from "../models/newsletter-request-response.model";
import { SimpleMessageResponseModel, SimpleMessageResWithErrorModel } from "../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class AddToNewsletterHttpReqResService extends ServerReqResHelper {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
        super();
    };

    addEmailToNewsletter(request: NewsletterRequestModel): Observable<SimpleMessageResWithErrorModel> {
        return this._http.post<SimpleMessageResponseModel>(this._endpoint.NEWSLETTER_SUBSCRIBE, request).pipe(
            map(({ responseMessage }) => {
                return new SimpleMessageResWithErrorModel(responseMessage, false);
            }),
            catchError(error => {
                return of(new SimpleMessageResWithErrorModel(RxjsHelper.serverResponseError(error), true));
            }),
        );
    };
}
