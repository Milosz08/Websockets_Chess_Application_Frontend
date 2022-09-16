/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: static-data-req-res.service.ts
 * Last modified: 15/09/2022, 18:01
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

import { StaticGenderDataResModel } from "../models/static-gender-data-res.model";
import { StaticCountryDataResModel } from "../models/static-country-data-res.model";
import { StaticCalendarDataResModel } from "../models/static-calendar-data-res.model";
import { HttpEndpointsHelper } from "../../../http-request-helpers/http-endpoints.helper";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class StaticDataReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    getRegisterCalendarData(): Observable<StaticCalendarDataResModel> {
        return this._http.get<StaticCalendarDataResModel>(this._endpoint.SIGNUP_CALENDAR_DATA);
    };

    getRegisterGenderData(): Observable<StaticGenderDataResModel> {
        return this._http.get<StaticGenderDataResModel>(this._endpoint.SIGNUP_GENDER_DATA);
    };

    getRegisterCountryData(): Observable<StaticCountryDataResModel> {
        return this._http.get<StaticCountryDataResModel>(this._endpoint.SIGNUP_COUNTRY_DATA);
    };
}
