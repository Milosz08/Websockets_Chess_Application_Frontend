/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-images-http-req-res.service.ts
 * Last modified: 20.11.2022, 23:15
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
import { UpdateUserImageResModel } from "../ngrx-store/user-images-ngrx-store/ngrx-models/update-user-image-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UserImagesHttpReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    changeUserProfileImage(multipartData: File): Observable<UpdateUserImageResModel> {
        return this._http.post<UpdateUserImageResModel>(
            this._endpoint.PROFILE_IMAGE,
            this.prepareMultipartFormDataResponse(multipartData),
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    deleteUserProfileImage(): Observable<UpdateUserImageResModel> {
        return this._http.delete<UpdateUserImageResModel>(
            this._endpoint.PROFILE_IMAGE,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    changeUserBannerImage(multipartData: File): Observable<UpdateUserImageResModel> {
        return this._http.post<UpdateUserImageResModel>(
            this._endpoint.BANNER_IMAGE,
            this.prepareMultipartFormDataResponse(multipartData),
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    deleteUserBannerImage(): Observable<SimpleMessageResponseModel> {
        return this._http.delete<SimpleMessageResponseModel>(
            this._endpoint.BANNER_IMAGE,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    private prepareMultipartFormDataResponse(multipartData: File): FormData {
        const payload = new FormData();
        payload.append("image", multipartData, multipartData.name);
        return payload;
    };
}
