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

import { Component, Input, OnInit } from "@angular/core";

import { OAuthSupplier } from "../../../../http-request-helpers/oauth2-request-endpoints.contants";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-user-avatar-image",
    templateUrl: "./user-avatar-image.component.html",
    styleUrls: [ "./user-avatar-image.component.scss" ],
})
export class UserAvatarImageComponent implements OnInit {

    _isSupplierNotLocal: boolean = true;

    @Input() _imageSizePx: number = 80;
    @Input() _initials: string = "CH";
    @Input() _hasImage: boolean = false;
    @Input() _imageUrl: string = "";
    @Input() _oauth2Supplier: string = "";
    @Input() _backgroundMixedType: string = "";

    _supplierImagePath: string = `assets/gfx/images/oauth2-${this._oauth2Supplier}-logo.svg`;
    _ngImageSizeStyle: object = { 'width': `${this._imageSizePx}px`, 'height': `${this._imageSizePx}px` };
    _ngSupplierImageStyleSize: object = { 'width': `${this._imageSizePx / 3.5}px`, 'height': `${this._imageSizePx / 3.5}px` };
    _ngFakeImageFontSize: object = { 'font-size': `${this._imageSizePx / 2.5}px` };
    _ngImageBorderElement: string = this._hasImage ? "image__container--is-original-image-generator" : "";

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        const allSuppliers = Object.keys(OAuthSupplier).map(s => OAuthSupplier[s as keyof typeof OAuthSupplier]);
        this._isSupplierNotLocal = allSuppliers.some(s => s.toLowerCase() === this._oauth2Supplier);
    };
}
