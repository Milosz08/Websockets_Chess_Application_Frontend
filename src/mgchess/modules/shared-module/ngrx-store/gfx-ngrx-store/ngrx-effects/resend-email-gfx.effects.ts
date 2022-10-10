/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: resend-email-gfx.effects.ts
 * Last modified: 10/10/2022, 16:10
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

import { catchError, map, mergeMap, Observable, of, tap } from "rxjs";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";
import { RxjsHelper } from "../../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../../models/suspense-loader-res.model";
import { SimpleMessageResponseModel } from "../../../../../models/simple-message-response.model";
import { ResendVerificationLinkReqResService } from "../../../services/resend-verification-link-req-res.service";

import * as NgrxAction_GFX from "../gfx.actions";
import { GfxReducerType } from "../../../../../ngrx-helpers/ngrx-store.types";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class ResendEmailGfxEffects {

    constructor(
        private _actions$: Actions,
        private _store: Store<GfxReducerType>,
        private _reqResService: ResendVerificationLinkReqResService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    resendEmailMessageForUnsubscribeNewsletter$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__attemptResendEmailForUnsubscribeNewsletter),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.RESEND_UNSUBSCRIBE_NEWSLETTER_LINK }));
            }),
            mergeMap(({ emailAddress }) => {
                return this.openGlobalInfoWindow(this._reqResService.resendEmailForUnsubscribeNewsletter(emailAddress));
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    resendEmailMessageForActivateAccount$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__attemptResendEmailForActivateAccount),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.RESEND_ACTIVATE_ACCOUNT_LINK }));
            }),
            mergeMap(({ emailAddress }) => {
                return this.openGlobalInfoWindow(this._reqResService.resendEmailForActivateAccount(emailAddress));
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    resendEmailMessageForChangePassword$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__attemptResendEmailForChangePassword),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__activeSuspense({ for: SuspenseLoader.RESEND_CHANGE_PASSWORD_LINK }));
            }),
            mergeMap(({ emailAddress }) => {
                return this.openGlobalInfoWindow(this._reqResService.resendEmailForChangePassword(emailAddress));
            }),
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__inactiveSuspense());
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    private openGlobalInfoWindow(res: Observable<SimpleMessageResponseModel>): Observable<any> {
        return res.pipe(
            tap(() => {
                this._store.dispatch(NgrxAction_GFX.__closeGlobalMessageModal());
            }),
            map(({ responseMessage }) => {
                this.asynchronicallyCloseModal();
                return NgrxAction_GFX.__openGlobalMessageModal({ message: responseMessage, ifError: false });
            }),
            catchError(error => {
                this.asynchronicallyCloseModal();
                return of(NgrxAction_GFX.__openGlobalMessageModal({
                    message: RxjsHelper.serverResponseError(error), ifError: true }));
            }),
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    private asynchronicallyCloseModal(): void {
        setTimeout(() => {
            this._store.dispatch(NgrxAction_GFX.__closeGlobalMessageModal());
        }, RxjsConstants.DEF_DELAY_GLOBAL_MODAL_MILIS);
    };
}
