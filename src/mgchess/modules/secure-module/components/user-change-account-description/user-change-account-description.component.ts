/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-change-account-description.component.ts
 * Last modified: 23.11.2022, 00:29
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
import { NgFormsService } from "../../../shared-module/services/ng-forms.service";
import { ChangeDescriptionFormModel } from "../../models/change-description-form.model";
import { UserManipulatorWithGfxReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { SimpleMessageResWithErrorModel } from "../../../../models/simple-message-response.model";
import { StaticUserDetailsFetcherService } from "../../services/static-user-details-fetcher.service";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_USM from "../../ngrx-store/user-manipulator-ngrx-store/user-manipulator.actions";
import * as NgrxSelector_USM from "../../ngrx-store/user-manipulator-ngrx-store/user-manipulator.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-user-change-account-description",
    templateUrl: "./user-change-account-description.component.html",
    styleUrls: [ "./user-change-account-description.component.scss" ],
    providers: [ StaticUserDetailsFetcherService ],
})
export class UserChangeAccountDescriptionComponent implements OnInit, OnDestroy {

    _isEditIsOpen$: Observable<boolean> = this._store.select(NgrxSelector_USM.sel_changeDescriptionIsOpen);
    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.CHANGE_ACCOUNT_DESCRIPTION));
    _suspenseRemoveLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.REMOVE_ACCOUNT_DESCRIPTION));

    _charactersCount: number = 0;
    _editDescriptionForm: FormGroup;
    _fetchedDescriptionSuspense: boolean = true;
    _fetchedDescription: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);
    _serverResponse: SimpleMessageResWithErrorModel = new SimpleMessageResWithErrorModel("", false);

    readonly _maxTextareaLenght: number = 2000;
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _ngFormsService: NgFormsService,
        private _store: Store<UserManipulatorWithGfxReducerType>,
        private _staticUserDetailsReqService: StaticUserDetailsFetcherService,
    ) {
        this._editDescriptionForm = new FormGroup({
            "description": new FormControl("", [ Validators.maxLength(2000) ]),
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_USM.sel_serverResponse, this._ngUnsubscribe,
            data => this._serverResponse = data);
        this._staticUserDetailsReqService.getUserDescription(this._ngUnsubscribe)
            .subscribe(data => {
                this._fetchedDescription = data;
                this._fetchedDescriptionSuspense = false;
            });
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleChangeCharactersCount(e: Event): void {
        if (this._serverResponse.responseMessage !== "") {
            this._store.dispatch(NgrxAction_USM.__clearServerResponse());
        }
        this._charactersCount = (e.target as HTMLTextAreaElement).value.length;
    };

    handleDiscardChangesOfAccountDescription(): void {
        this.clearTextarea();
        this._store.dispatch(NgrxAction_USM.__editUserDescriptionHidden());
    };

    handleOpenAccountDescriptionEditor(): void {
        this._editDescriptionForm
            .patchValue({ "description": this._fetchedDescription.responseMessage.replace(/<br>/g, "\n") });
        this._charactersCount = this._fetchedDescription.responseMessage.length;
        this._store.dispatch(NgrxAction_USM.__editUserDescriptionVisible());
    };

    handleChangeAccountDescription(): void {
        const description = this._ngFormsService.extractFormFields<ChangeDescriptionFormModel>(this._editDescriptionForm, false);
        this._store.dispatch(NgrxAction_USM.__attemptToEditUserDescription({ description }));
    };

    handleCloseValueBoxAndRemove(): void {
        this._store.dispatch(NgrxAction_USM.__attemptToRemoveUserDescription());
    };

    private clearTextarea(): void {
        this._charactersCount = 0;
        this._editDescriptionForm.get("description")!.setValue("");
    };
}
