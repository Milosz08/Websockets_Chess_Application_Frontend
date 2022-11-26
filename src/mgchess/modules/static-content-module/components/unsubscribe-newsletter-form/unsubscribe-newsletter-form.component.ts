/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: unsubscribe-newsletter-form.component.ts
 * Last modified: 03/09/2022, 16:40
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";

import { NewsletterReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { EmailAndTokenResModel } from "../../ngrx-store/newsletter-ngrx-store/ngrx-models/email-and-token-res.model";

import * as NgrxAction_NWL from "../../ngrx-store/newsletter-ngrx-store/newsletter.actions";
import * as NgrxAction_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxSelector_NWL from "../../ngrx-store/newsletter-ngrx-store/newsletter.selectors";
import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";

import {
    UnsubscribeNewsletterEmailReq, UnsubscribeNewsletterViaOtaReq
} from "../../ngrx-store/newsletter-ngrx-store/ngrx-models/unsubscribe-newsletter-req-res.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-unsubscribe-newsletter-form",
    templateUrl: "./unsubscribe-newsletter-form.component.html",
    styleUrls: [ "./unsubscribe-newsletter-form.component.scss" ],
    host: { class: "mgchess__flex-safety-container" },
    providers: [ ValidatorPatternConstants ],
})
export class UnsubscribeNewsletterFormComponent implements OnInit, OnDestroy {

    _unsubscribeEmailForm: FormGroup;
    _unsubscribeTokenForm: FormGroup;

    _hideForms$: Observable<boolean> = this._store.select(NgrxSelector_NWL.sel_successfullValidToken);
    _isTokenFieldVisible$: Observable<boolean> = this._store.select(NgrxSelector_NWL.sel_tokenFormVisibility);

    _suspenseResend$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.RESEND_UNSUBSCRIBE_NEWSLETTER_LINK));
    _suspenseLoadingToken$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.UNSUBSCRIBE_VIA_OTA));
    _suspenseLoadingEmail$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.ATTEMPT_UNSUBSCRIBE));

    _userEmail: string = "";
    _serverResponse!: EmailAndTokenResModel;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _regex: ValidatorPatternConstants,
        private _store: Store<NewsletterReducerType>,
    ) {
        this._unsubscribeEmailForm = new FormGroup({
            emailAddress: new FormControl("", [ Validators.required, Validators.email, Validators.maxLength(100) ]),
        });
        this._unsubscribeTokenForm = new FormGroup({
            token: new FormControl("", [ Validators.required, Validators.pattern(_regex.OTA_TOKEN_REGEX) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_NWL.sel_emailTokenResponse, this._ngUnsubscribe,
                data => this._serverResponse = data);
    };

    ngOnDestroy(): void {
        this._userEmail = "";
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    cleanEmailServerResponse(): void {
        if (this._serverResponse.emailResponse.responseMessage === "") return;
        this._store.dispatch(NgrxAction_NWL.__cleanupEmailServerResponse());
    };

    cleanTokenServerResponse(): void {
        if (this._serverResponse.tokenResponse.responseMessage === "") return;
        this._store.dispatch(NgrxAction_NWL.__cleanupTokenServerResponse());
    };

    handleAttemptToUnusubscribe(): void {
        const emailReq = AngularFormsHelper.extractFormFields<UnsubscribeNewsletterEmailReq>(this._unsubscribeEmailForm);
        this._userEmail = emailReq.emailAddress;
        this._store.dispatch(NgrxAction_NWL.__attemptToUnsubscribeNewsletter({ emailReq }));
    };

    handleSendTokenAndUnsubscribe(): void {
        const tokenReq = AngularFormsHelper.extractFormFields<UnsubscribeNewsletterViaOtaReq>(this._unsubscribeTokenForm);
        this._store.dispatch(NgrxAction_NWL.__unsubscribeNewsletter({ tokenReq }));
    };

    handleResendEmailVerificationLink(): void {
        this._store.dispatch(NgrxAction_GFX.__attemptResendEmailForUnsubscribeNewsletter({ emailAddress: this._userEmail }));
    };
}
