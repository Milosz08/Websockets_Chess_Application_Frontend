/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: unsubscribe-newsletter.effects.ts
 * Last modified: 04/09/2022, 16:37
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
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { catchError, delay, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";

import { newsletterNgrxStore } from "../newsletter.reducer";
import { NewsletterReqResService } from "../../../services/newsletter-req-res.service";

import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { NewsletterReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";
import { UnsubscribeNewsletterViaOtaReq } from "../ngrx-models/unsubscribe-newsletter-req-res.model";

import * as NgrxAction_NWL from "../newsletter.actions";
import * as NgrxAction_GFX from "../../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class UnsubscribeNewsletterEffects {

    constructor(
        private _actions$: Actions,
        private _store: Store<NewsletterReducerType>,
        private _httpService: NewsletterReqResService,
    ) {
    };

    attemptToUnsubscribeNewsletter$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_NWL.__attemptToUnsubscribeNewsletter),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.ATTEMPT_UNSUBSCRIBE }));
            }),
            mergeMap(({ emailReq }) => {
                return this._httpService.attemptToUnsubscribeNewsletter(emailReq).pipe(
                    map(response => {
                        return NgrxAction_NWL.__successfulAttemptToUnsubscribeNewsletter({
                            serverResponse: response.responseMessage, userEmail: emailReq.emailAddress });
                    }),
                    catchError(({ error }) => {
                        return of(NgrxAction_NWL.__failureAttemptToUnsubscribeNewsletter({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    unsubscribeNewsletter$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_NWL.__unsubscribeNewsletter),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.UNSUBSCRIBE_VIA_OTA }));
            }),
            delay(RxjsConstants.DEF_DELAY_MILIS),
            withLatestFrom(this._store.select(newsletterNgrxStore.reducerName)),
            mergeMap(([ action, store ]) => {
                const req = new UnsubscribeNewsletterViaOtaReq(action.tokenReq.token, store.removingEmail);
                return this._httpService.unsubscribeNewsletterViaOta(req).pipe(
                    map(response => {
                        return NgrxAction_NWL.__successfulUnsubscribeNewsletter({
                            serverResponse: response.responseMessage });
                    }),
                    catchError(error => {
                        return of(NgrxAction_NWL.__failureUnsubscribeNewsletter({
                            serverResponse: RxjsHelper.serverResponseError(error) }));
                    }),
                );
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });
}
