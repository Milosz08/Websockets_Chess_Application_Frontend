/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: gfx.effects.ts
 * Last modified: 16/09/2022, 17:55
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

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { delay, map, tap, withLatestFrom } from "rxjs";
import { RxjsConstants } from "../../../../../rxjs-helpers/rxjs.constants";

import { ModalWindowType } from "../ngrx-models/action-window-modal.model";
import { sessionNgrxStore } from "../../session-ngrx-store/session.reducer";
import { SessionWithGfxCombinedReducerTypes } from "../../../../../ngrx-helpers/ngrx-store.types";

import * as NgrxAction_GFX from "../gfx.actions";

//----------------------------------------------------------------------------------------------------------------------

@Injectable()
export class GfxEffects {

    public static readonly SCROLL_DISABLED_CSS = "scroll--disabled";

    private readonly REDIR_MODALS: Array<ModalWindowType> = [
        ModalWindowType.CHANGE_PROFILE_IMAGE, ModalWindowType.CHANGE_BANNER_IMAGE,
    ];

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _router: Router,
        private _actions$: Actions,
        @Inject(DOCUMENT) private _document: Document,
        private _store: Store<SessionWithGfxCombinedReducerTypes>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    globalSuspenseLoaderOnEnd$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__prependInactiveGlobalSuspense),
            tap(() => {
                this._document.body.classList.add(GfxEffects.SCROLL_DISABLED_CSS);
            }),
            delay(RxjsConstants.DEF_SUSPENSE_MILIS),
            map(() => {
                this._document.body.classList.remove(GfxEffects.SCROLL_DISABLED_CSS);
                return NgrxAction_GFX.__inactiveGlobalSuspense();
            })
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    onOpenWindowModal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__openActionWindowModal),
            tap(() => {
                this._document.body.classList.add(GfxEffects.SCROLL_DISABLED_CSS);
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    onCloseWindowModal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__closeActionWindowModal),
            tap(() => {
                this._document.body.classList.remove(GfxEffects.SCROLL_DISABLED_CSS);
            }),
        );
    }, { dispatch: false });

    //------------------------------------------------------------------------------------------------------------------

    onOpenChangeImageModalRedirect$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_GFX.__openActionWindowModal),
            withLatestFrom(this._store.select(sessionNgrxStore.reducerName)),
            tap(([ action, state ]) => {
                if (!Boolean(state.userCredentialsData)) {
                    this._router.navigate([ '/' ]).then(r => r);
                    return;
                }
                const redirLink = "/secure/my-account" as const;
                if (this.REDIR_MODALS.some(t => t === action.modalType) && !this._router.url.includes(redirLink)) {
                    this._router.navigate([ redirLink ]).then(r => r);
                }
            }),
        );
    }, { dispatch: false });
}
