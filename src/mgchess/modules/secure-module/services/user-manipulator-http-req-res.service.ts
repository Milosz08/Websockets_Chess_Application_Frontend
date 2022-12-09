/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-manipulator-http-req-res.service.ts
 * Last modified: 23.11.2022, 01:04
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

import { UserPersonalDataResModel } from "../models/user-personal-data-res.model";
import { ChangeDescriptionFormModel } from "../models/change-description-form.model";
import { HttpEndpointsHelper } from "../../../http-request-helpers/http-endpoints.helper";
import { SimpleMessageResponseModel } from "../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UserManipulatorHttpReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    getUserAccountDescription(): Observable<ChangeDescriptionFormModel> {
        return this._http.get<ChangeDescriptionFormModel>(
            this._endpoint.LOGGED_ACCOUNT_DESCRIPTION,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    changeUserAccountDescription(req: ChangeDescriptionFormModel): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.LOGGED_ACCOUNT_DESCRIPTION,
            req,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    removeUserAccountDescription(): Observable<SimpleMessageResponseModel> {
        return this._http.delete<SimpleMessageResponseModel>(
            this._endpoint.LOGGED_ACCOUNT_DESCRIPTION,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    getUserPersonalSettingsData(): Observable<UserPersonalDataResModel> {
        return this._http.get<UserPersonalDataResModel>(
            this._endpoint.PERSONAL_SETTINGS_DATA,
        );
    };
}
