/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: window-modal-wrapper.component.ts
 * Last modified: 19.11.2022, 17:39
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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";
import { FadeInOutAnimation } from "../../../../animations/fade.animation";

import { GfxReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { ActionWindowModalModel, ModalWindowType } from "../../ngrx-store/gfx-ngrx-store/ngrx-models/action-window-modal.model";

import * as NgrxAction_GFX from "../../ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxSelector_GFX from "../../ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-window-modal-wrapper",
    templateUrl: "./window-modal-wrapper.component.html",
    styleUrls: [ "./window-modal-wrapper.component.scss" ],
    animations: [ FadeInOutAnimation ],
})
export class WindowModalWrapperComponent implements OnInit, OnDestroy {

    @Input() _modalType: ModalWindowType = ModalWindowType.MODAL_INACTIVE;
    @Input() _customActionButtonTitle: string = "";
    @Input() _customActionButtonText: string = "";
    @Input() _errorResponse: string = "";
    @Input() _suspenseLoaderActive$: Observable<boolean> = new Observable<boolean>();

    @Output() _emitCustomAction: EventEmitter<void> = new EventEmitter<void>();

    _modalProperties!: ActionWindowModalModel;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<GfxReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_GFX.sel_windowModalProps, this._ngUnsubscribe,
            data => this._modalProperties = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleCloseWindowModal(): void {
        this._store.dispatch(NgrxAction_GFX.__closeActionWindowModal());
    };

    handlePrepareCustomAction(): void {
        this.handleCloseWindowModal();
        this._emitCustomAction.emit();
    };
}
