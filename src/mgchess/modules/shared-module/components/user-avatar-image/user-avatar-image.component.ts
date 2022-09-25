/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-avatar-image.component.ts
 * Last modified: 25/09/2022, 05:43
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

import { Component, Input } from "@angular/core";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-user-avatar-image",
    templateUrl: "./user-avatar-image.component.html",
    styleUrls: [ "./user-avatar-image.component.scss" ],
})
export class UserAvatarImageComponent {

    @Input() _imageSizePx: number = 80;
    @Input() _initials: string = "CH";
    @Input() _imageUrl: string = "";
    @Input() _oauth2Supplier: string = "";
    @Input() _backgroundMixedType: string = "";

    get __supplierImagePath(): string {
        return `assets/gfx/images/oauth2-${this._oauth2Supplier}-logo.svg`;
    };

    get __ngImageSizeStyle(): object {
        return { 'width': `${this._imageSizePx}px`, 'height': `${this._imageSizePx}px` };
    };
}
