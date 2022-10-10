/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: global-server-response-modal.component.ts
 * Last modified: 10/10/2022, 17:07
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
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";
import { RxjsHelper } from "../../../../rxjs-helpers/rxjs.helper";

import { GfxReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { SlideBottomTopAnimation } from "../../../../animations/fade.animation";
import { GlobalResponseModalModel } from "../../ngrx-store/gfx-ngrx-store/ngrx-models/global-response-modal.model";

import * as NgrxAction_GFX from "../../ngrx-store/gfx-ngrx-store/gfx.actions";
import * as NgrxSelector_GFX from "../../ngrx-store/gfx-ngrx-store/gfx.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-global-server-response-modal",
    templateUrl: "./global-server-response-modal.component.html",
    styleUrls: [ "./global-server-response-modal.component.scss" ],
    animations: [ SlideBottomTopAnimation ],
})
export class GlobalServerResponseModalComponent implements OnInit, OnDestroy {

    _globalResponseModalData!: GlobalResponseModalModel;

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _store: Store<GfxReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        RxjsHelper.subscribeData(this._store, NgrxSelector_GFX.sel_globalResponseModalData, this._ngUnsubscribe,
                data => this._globalResponseModalData = data);
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    handleForceCloseModalBox(): void {
        this._store.dispatch(NgrxAction_GFX.__closeGlobalMessageModal());
    };

    get __ngIfErrorCssClass(): string {
        return this._globalResponseModalData!.ifError ? "text-content--error" : "";
    };
}
