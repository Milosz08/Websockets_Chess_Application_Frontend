/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: close-outside-click-component.directive.ts
 * Last modified: 16/09/2022, 17:09
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

import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { filter, fromEvent, Subject, takeUntil } from "rxjs";
import { RxjsHelper } from "../../../rxjs-helpers/rxjs.helper";

//----------------------------------------------------------------------------------------------------------------------

@Directive({
    selector: "[closeOutsideClickComponent]",
})
export class CloseOutsideClickComponentDirective implements AfterViewInit, OnDestroy {

    @Output() _clickOutisdeElement: EventEmitter<any> = new EventEmitter<any>();

    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document,
    ) {
    };

    ngAfterViewInit(): void {
        fromEvent(this.document, "click").pipe(takeUntil(this._ngUnsubscribe), filter(e => {
            return !this.isInside(e.target as HTMLElement);
        })).subscribe(() => {
            this._clickOutisdeElement.emit();
        });
    };

    ngOnDestroy(): void {
        RxjsHelper.cleanupExecutor(this._ngUnsubscribe);
    };

    private isInside(elementToCheck: HTMLElement): boolean {
        return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
    };
}
