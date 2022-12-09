/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 *  File name: setting-personal-data-and-general-page.component.ts
 *  Last modified: 28/11/2022, 11:09
 *  Project name: chess-app-frontend
 *
 *  Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL
 *  COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 */

import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { SuspenseLoader } from "../../../../models/suspense-loader-res.model";
import { UserPersonalDataResModel } from "../../models/user-personal-data-res.model";
import { UserManipulatorWithGfxReducerType } from "../../../../ngrx-helpers/ngrx-store.types";
import { BrowserMetaSerializatorLoader } from "../../../../browser-meta-serialization/browser-meta-serializator.loader";
import { SingleModuleType, SinglePageType } from "../../../../browser-meta-serialization/browser-meta-serializator.types";

import * as NgrxSelector_GFX from "../../../shared-module/ngrx-store/gfx-ngrx-store/gfx.selectors";
import * as NgrxAction_UMP from "../../ngrx-store/user-manipulator-ngrx-store/user-manipulator.actions";
import * as NgrxSelector_UMP from "../../ngrx-store/user-manipulator-ngrx-store/user-manipulator.selectors";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-setting-personal-data-and-general-page",
    templateUrl: "./setting-personal-data-and-general-page.component.html",
    styleUrls: [ "./setting-personal-data-and-general-page.component.scss" ],
})
export class SettingPersonalDataAndGeneralPageComponent extends BrowserMetaSerializatorLoader implements OnInit {

    _serverResponse$: Observable<string> = this._store.select(NgrxSelector_UMP.sel_loadDataServerResponse);
    _serverResponseActive$: Observable<boolean> = this._store.select(NgrxSelector_UMP.sel_loadDataServerResponseActive);
    _personalSettings$: Observable<UserPersonalDataResModel> = this._store.select(NgrxSelector_UMP.sel_userPersonalSettings);

    _suspenseLoader$: Observable<boolean> = this._store.select(NgrxSelector_GFX.getCurrActiveSuspense(
        SuspenseLoader.LOAD_USER_PERSONAL_SETTINGS_DATA));

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _metaService: Meta,
        private _titleService: Title,
        private _store: Store<UserManipulatorWithGfxReducerType>,
    ) {
        super(_titleService, _metaService, SingleModuleType.SECURED_MODULE, SinglePageType.SETTINGS_PERSONAL_DATA_AND_GENERAL);
    }

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.dispatch(NgrxAction_UMP.__attemptToLoadPersonalDataSettings());
    };
}
