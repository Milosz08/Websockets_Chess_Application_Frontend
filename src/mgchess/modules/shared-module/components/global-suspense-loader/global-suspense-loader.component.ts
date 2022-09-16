/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: global-suspense-loader.component.ts
 * Last modified: 16/09/2022, 17:46
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

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { FadeOutAnimation } from "../../../../animations/fade.animation";
import { GlobalSuspenseService } from "../../services/global-suspense.service";

import { GlobalReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import * as NgrxSelector_GLB from "../../ngrx-store/global-ngrx-store/global.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-global-suspense-loader",
    templateUrl: "./global-suspense-loader.component.html",
    styleUrls: [ "./global-suspense-loader.component.scss" ],
    providers: [ GlobalSuspenseService ],
    animations: [ FadeOutAnimation ],
})
export class GlobalSuspenseLoaderComponent {

    _isActive$: Observable<boolean> = this._store.select(NgrxSelector_GLB.sel_globalSuspenseLoadingStatus);

    constructor(
        private _store: Store<GlobalReducerType>,
        private _suspenseService: GlobalSuspenseService,
    ) {
        this._suspenseService.toggleSuspenseLoaderComponent();
    };
}
