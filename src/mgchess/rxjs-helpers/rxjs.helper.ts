/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: rxjs.helper.ts
 * Last modified: 04/09/2022, 17:08
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

import { Observable, Subject, takeUntil } from "rxjs";
import { DefaultProjectorFn, MemoizedSelector, Store } from "@ngrx/store";

import { HttpDefaultConstants } from "../http-request-helpers/http-default.constants";

//----------------------------------------------------------------------------------------------------------------------

type Selector = MemoizedSelector<object, any, DefaultProjectorFn<any>>;

//----------------------------------------------------------------------------------------------------------------------

export class RxjsHelper {

    static cleanupExecutor(subject: Subject<void>): void {
        subject.next();
        subject.complete();
    };

    static subscribeData<T>(store: Store<T>, selector: Selector | any, unsubscribe: Subject<void>): Observable<any> {
        return store.select(selector).pipe(takeUntil(unsubscribe));
    };

    static serverResponseError(error: any): string {
        return !error.errors ? HttpDefaultConstants.BASIC_SERVER_ERR_MESSAGE : error.errors[0];
    };
}
