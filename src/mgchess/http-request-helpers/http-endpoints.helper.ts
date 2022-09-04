/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: http-endpoints.helper.ts
 * Last modified: 25/08/2022, 22:08
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

@Injectable({
    providedIn: "root",
})
export class HttpEndpointsHelper {

    private readonly BASIC_HTTP = environment.httpURI + "javabean/app/v1/";

    private readonly NEWSLETTER_EMAIL = this.BASIC_HTTP + "newsletter-email/";
    readonly NEWSLETTER_SUBSCRIBE = this.NEWSLETTER_EMAIL + "subscribe";
    readonly NEWSLETTER_ATTEMPT_UNSUBSCRIBE = this.NEWSLETTER_EMAIL + "attempt-unsubscribe";
    readonly NEWSLETTER_UNSUBSCRIBE_VIA_OTA = this.NEWSLETTER_EMAIL + "unsubscribe-via-ota";
    readonly NEWSLETTER_UNSUBSCRIBE_VIA_JWT = this.NEWSLETTER_EMAIL + "unsubscribe-via-jwt";
}
