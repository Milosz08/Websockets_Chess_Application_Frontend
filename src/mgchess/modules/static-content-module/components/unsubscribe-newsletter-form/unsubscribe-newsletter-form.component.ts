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

import { Component, HostListener } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AngularFormsHelper } from "../../../../angular-forms-helpers/angular-forms.helper";
import { ServerReqResHelper } from "../../../../http-request-helpers/server-req-res.helper";
import * as UnsNewsletterModel from "../../models/unsubscribe-newsletter-request-response.model";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-unsubscribe-newsletter-form",
    templateUrl: "./unsubscribe-newsletter-form.component.html",
    styleUrls: [ "./unsubscribe-newsletter-form.component.scss" ],
})
export class UnsubscribeNewsletterFormComponent {

    _unsubscribeEmailForm: FormGroup;
    _emailServerResponse: SimpleMessageResWithErrorModel;

    _unsubscribeTokenForm: FormGroup;
    _tokenServerResponse: SimpleMessageResWithErrorModel;

    _isTokenFieldVisible: boolean = false;

    readonly _emailFormHelper: AngularFormsHelper;
    readonly _tokenFormHelper: AngularFormsHelper;
    readonly _serverResReqHelper: ServerReqResHelper = new ServerReqResHelper();

    constructor() {
        this._unsubscribeEmailForm = new FormGroup({
            emailAddress: new FormControl("", [ Validators.required, Validators.email, Validators.maxLength(100) ]),
        });
        this._unsubscribeTokenForm = new FormGroup({
            token: new FormControl("", [ Validators.required, Validators.pattern("^[a-zA-Z0-9]+$"),
                Validators.minLength(10), Validators.maxLength(10) ]),
        });
        this._emailServerResponse = new SimpleMessageResWithErrorModel("", false);
        this._tokenServerResponse = new SimpleMessageResWithErrorModel("", false);
        this._emailFormHelper = new AngularFormsHelper(this._unsubscribeEmailForm);
        this._tokenFormHelper = new AngularFormsHelper(this._unsubscribeTokenForm);
    };

    @HostListener("document:click", [])
    handleClearServerMessage() {
        if (!this._emailServerResponse.responseError) this._emailServerResponse.responseMessage = "";
        if (!this._tokenServerResponse.responseError) this._tokenServerResponse.responseMessage = "";
    };

    handleAttemptToUnusubscribe(): void {
        const request = this._emailFormHelper.getAllFieldsAndCleanup<UnsNewsletterModel.AttemptUnsubscribeNewsletterReq>();
        // sending
        this._isTokenFieldVisible = true;
    };

    handleSendTokenAndUnsubscribe(): void {
        const request = this._tokenFormHelper.getAllFieldsAndCleanup<UnsNewsletterModel.UnsubscribeNewsletterFormReq>();
        // sending
    };
}
