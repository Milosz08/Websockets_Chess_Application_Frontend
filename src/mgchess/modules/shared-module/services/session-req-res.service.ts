/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: session-req-res.service.ts
 * Last modified: 25/09/2022, 04:15
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
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { HttpEndpointsHelper } from "../../../http-request-helpers/http-endpoints.helper";

import { LoginReqModel } from "../ngrx-store/session-ngrx-store/ngrx-models/login-data-req.model";
import { UserCredentialsDataResModel } from "../ngrx-store/session-ngrx-store/ngrx-models/user-credentials-data-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class SessionReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    loginViaLocal(req: LoginReqModel): Observable<UserCredentialsDataResModel> {
        return this._http.post<UserCredentialsDataResModel>(
            this._endpoint.LOGIN_VIA_LOCAL,
            req,
        );
    };

    loginViaOAuth2(jwtToken: string): Observable<UserCredentialsDataResModel> {
        return this._http.post<UserCredentialsDataResModel>(
            this._endpoint.LOGIN_VIA_OAUTH2,
            null,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };
}
