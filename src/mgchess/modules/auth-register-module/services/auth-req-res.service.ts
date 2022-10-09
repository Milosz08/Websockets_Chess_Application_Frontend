/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: auth-req-res.service.ts
 * Last modified: 09/09/2022, 15:06
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
import { SimpleMessageResponseModel } from "../../../models/simple-message-response.model";
import { OtaTokenMutlipleEmailsReqModel, OtaTokenNicknameEmailReqModel } from "../models/ota-token-mutliple-emails-req.model";

import { SignupReqModel } from "../ngrx-store/auth-ngrx-store/ngrx-models/signup-req.model";
import { FinishSignupReqModel } from "../ngrx-store/auth-ngrx-store/ngrx-models/finish-signup-req.model";
import { AttemptFinishSignupResModel } from "../ngrx-store/auth-ngrx-store/ngrx-models/attempt-finish-signup-res.model";
import { ValidateChangePasswordResModel } from "../ngrx-store/change-password-ngrx-store/ngrx-models/validate-change-password-res.model";
import { ChangeForgottenPasswordReqModel } from "../ngrx-store/change-password-ngrx-store/ngrx-models/change-forgotten-password-req.model";
import { ChangePasswordUserDetailsResModel } from "../ngrx-store/change-password-ngrx-store/ngrx-models/change-password-user-details-res.model";
import { EmailAddressesChangePasswordResModel } from "../ngrx-store/change-password-ngrx-store/ngrx-models/email-addresses-change-password-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class AuthReqResService {

    constructor(
        private _http: HttpClient,
        private _endpoint: HttpEndpointsHelper,
    ) {
    };

    signupViaLocal(req: SignupReqModel): Observable<AttemptFinishSignupResModel> {
        return this._http.post<AttemptFinishSignupResModel>(
            this._endpoint.SIGNUP_VIA_LOCAL,
            req,
        );
    };

    attemptToFinishSignupViaOAuth2(jwtToken: string): Observable<AttemptFinishSignupResModel> {
        return this._http.post<AttemptFinishSignupResModel>(
            this._endpoint.ATTEMPT_FINISH_SIGNUP_VIA_OAUTH2,
            null,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };

    finishSignupViaOAuth2(req: FinishSignupReqModel, jwtToken: string): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.FINISH_SIGNUP_VIA_OAUTH2,
            req,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };

    attemptToActivateAccountViaOta(jwtToken: string): Observable<AttemptFinishSignupResModel> {
        return this._http.post<AttemptFinishSignupResModel>(
            this._endpoint.ATTEMPT_ACTIVATE_ACCOUNT,
            null,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };

    activateAccountViaOta(req: OtaTokenMutlipleEmailsReqModel): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.ACTIVATE_ACCOUNT,
            req,
        );
    };

    sendRequestToChangePassword(usernameEmailReq: string): Observable<EmailAddressesChangePasswordResModel> {
        return this._http.post<EmailAddressesChangePasswordResModel>(
            this._endpoint.ATTEMPT_TO_CHANGE_PASSWORD,
            { usernameEmailAddress: usernameEmailReq },
        );
    };

    validateChangePasswordRequestViaOta(req: OtaTokenNicknameEmailReqModel): Observable<ValidateChangePasswordResModel> {
        return this._http.post<ValidateChangePasswordResModel>(
            this._endpoint.VALIDATE_ATTEMPT_TO_CHANGE_PASSWORD,
            req,
        );
    };

    validateChangePasswordJwtAndReturnUserData(jwtToken: string): Observable<ChangePasswordUserDetailsResModel> {
        return this._http.post<ChangePasswordUserDetailsResModel>(
            this._endpoint.CHANGE_PASSWORD_CHECK_JWT,
            null,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };

    changeForgotterPassword(req: ChangeForgottenPasswordReqModel, jwtToken: string): Observable<SimpleMessageResponseModel> {
        return this._http.post<SimpleMessageResponseModel>(
            this._endpoint.CHANGE_FORGOTTEN_PASSWORD,
            req,
            { headers: new HttpHeaders({ "Authorization": `Bearer ${jwtToken}` }) },
        );
    };
}
