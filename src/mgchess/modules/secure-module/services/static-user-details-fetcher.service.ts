/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: static-user-details-fetcher.service.ts
 * Last modified: 08.12.2022, 01:26
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

import { catchError, delay, map, Observable, of, Subject, takeUntil } from "rxjs";
import { RxjsConstants } from "../../../rxjs-helpers/rxjs.constants";

import { UserManipulatorHttpReqResService } from "./user-manipulator-http-req-res.service";
import { SimpleMessageResWithErrorModel } from "../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class StaticUserDetailsFetcherService {

    constructor(
        private _reqResService: UserManipulatorHttpReqResService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    getUserDescription(unsubscribe: Subject<void>): Observable<SimpleMessageResWithErrorModel> {
        return this._reqResService.getUserAccountDescription().pipe(
            delay(RxjsConstants.DEF_SHORT_DELAY_MILIS),
            takeUntil(unsubscribe),
            map(data => {
                return new SimpleMessageResWithErrorModel(data.description, false);
            }),
            catchError(() => {
                return of(new SimpleMessageResWithErrorModel("Unable to load description. Try again later.", true));
            }),
        );
    };
}
