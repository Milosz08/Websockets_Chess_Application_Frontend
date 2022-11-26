/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: simple-server-response-query.component.ts
 * Last modified: 02/10/2022, 20:53
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
import { ActivatedRoute } from "@angular/router";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-simple-server-response-query",
    templateUrl: "./simple-server-response-query.component.html",
    styleUrls: [ "./simple-server-response-query.component.scss" ]
})
export class SimpleServerResponseQueryComponent implements OnInit {

    @Input() _header: string = "";

    _serverResponseMessage: string = "";
    _responseError: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    constructor(
        private _route: ActivatedRoute,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._serverResponseMessage = String(this._route.snapshot.queryParamMap.get("message"));
        this._responseError = String(this._route.snapshot.queryParamMap.get("error")) === "true";
    };
}
