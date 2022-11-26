/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: copyright-newsletter.component.ts
 * Last modified: 24/08/2022, 21:17
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

import { Component, HostListener, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";

import { delay, Subject, takeUntil } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";
import { RxjsConstants } from "../../../../rxjs-helpers/rxjs.constants";

import { NgFormsService } from "../../services/ng-forms.service";
import { NewsletterRequestModel } from "../../models/newsletter-request-response.model";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

import { ValidatorPatternConstants } from "../../../../validator-helpers/validator-pattern.constants";
import { AddToNewsletterHttpReqResService } from "../../services/add-to-newsletter-http-req-res.service";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-copyright-newsletter",
    templateUrl: "./copyright-newsletter.component.html",
    styleUrls: [ "./copyright-newsletter.component.scss" ],
    providers: [ NgFormsService, ValidatorPatternConstants, AddToNewsletterHttpReqResService ],
})
export class CopyrightNewsletterComponent implements OnDestroy {

    _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);
    _suspenseActive: boolean = false;

    readonly _newsletterForm: FormGroup;
    readonly _initialYear: number = 2022;
    readonly _currYear: number = moment().year();

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        private _regex: ValidatorPatternConstants,
        public _httpService: AddToNewsletterHttpReqResService,
    ) {
        this._newsletterForm = new FormGroup({
            userName: new FormControl("", [ Validators.required, Validators.pattern(_regex.USERNAME_REGEX) ]),
            emailAddress: new FormControl("", [ Validators.required, Validators.email, Validators.max(100) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    @HostListener("document:click", [])
    handleClearServerMessage() {
        if (!this._serverResponse.responseError) {
            this._serverResponse.responseMessage = "";
            this._serverResponse.responseError = false;
        }
    };

    copyYearsConcate(): string {
        return this._currYear > this._initialYear ? `${this._initialYear} - ${this._currYear}` : String(this._currYear);
    };

    handleSubmitNewsletterEmail(): void {
        this._suspenseActive = true;
        const request = this._ngFormsService.extractFormFields<NewsletterRequestModel>(this._newsletterForm);
        this._httpService.addEmailToNewsletter(request)
            .pipe(
                takeUntil(this._ngUnsubscribe),
                delay(RxjsConstants.DEF_DELAY_MILIS)
            )
            .subscribe(response => {
                this._suspenseActive = false;
                this._serverResponse = response;
            });
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };
}
