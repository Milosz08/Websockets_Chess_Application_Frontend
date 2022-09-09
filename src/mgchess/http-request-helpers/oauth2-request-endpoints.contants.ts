/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: oauth2-request-endpoints.contants.ts
 * Last modified: 08/09/2022, 21:46
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
import { environment } from "../../environments/environment";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class Oauth2RequestEndpointsContants {
    private readonly BASIC_OAUTH2_ENDPOINT = environment.httpBackendURI + "oauth2/authorization/";
    private readonly REDIRECT_URI = `?redirect_uri=${environment.httpFrontEndURI}auth/login`;

    readonly OAUTH_GOOGLE_URI = this.BASIC_OAUTH2_ENDPOINT + "google" + this.REDIRECT_URI;
    readonly OAUTH_FACEBOOK_URI = this.BASIC_OAUTH2_ENDPOINT + "facebook" + this.REDIRECT_URI;
}
