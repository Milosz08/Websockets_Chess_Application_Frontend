/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: upload-files-mouse-events.directive.ts
 * Last modified: 20.11.2022, 15:52
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

import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

//----------------------------------------------------------------------------------------------------------------------

@Directive({
    selector: "[mgchessUploadFilesMouseEvents]",
})
export class UploadFilesMouseEventsDirective {

    @HostBinding("class.dropboz-zone--while-file-dropping") fileOver: boolean = false;
    @Output() _emitDroppedFiles: EventEmitter<FileList> = new EventEmitter<FileList>();

    //------------------------------------------------------------------------------------------------------------------

    @HostListener("dragover", [ "$event" ])
    onDragOver(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = true;
    }

    @HostListener("dragleave", [ "$event" ])
    onDragLeave(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
    }

    @HostListener("drop", [ "$event" ])
    ondrop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
        const files = (e.dataTransfer as DataTransfer).files;
        if (files.length > 0) {
            this._emitDroppedFiles.emit(files);
        }
    }
}
