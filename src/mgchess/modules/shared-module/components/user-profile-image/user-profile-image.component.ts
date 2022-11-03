/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: user-profile-image.component.ts
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

import { Component, Input, OnInit } from "@angular/core";

import { OAuthSupplier } from "../../../../http-request-helpers/oauth2-request-endpoints.contants";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-user-profile-image",
    templateUrl: "./user-profile-image.component.html",
    styleUrls: [ "./user-profile-image.component.scss" ],
})
export class UserProfileImageComponent implements OnInit {

    _isSupplierNotLocal: boolean = true;

    @Input() _imageSizePx: number = 80;
    @Input() _imageUrl: string = "";
    @Input() _oauth2Supplier: string = "";

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        const allSuppliers = Object.keys(OAuthSupplier).map(s => OAuthSupplier[s as keyof typeof OAuthSupplier]);
        this._isSupplierNotLocal = allSuppliers.some(s => s.toLowerCase() === this._oauth2Supplier);
    };

    get __supplierImagePath(): string {
        return `assets/gfx/images/oauth2-${this._oauth2Supplier}-logo.svg`;
    };

    get __ngImageSizeStyle(): object {
        return { 'width': `${this._imageSizePx}px`, 'height': `${this._imageSizePx}px` };
    };

    get __ngSupplierImageSizeStyle(): object {
        return { 'width': `${this._imageSizePx / 3.5}px`, 'height': `${this._imageSizePx / 3.5}px` };
    };
}
