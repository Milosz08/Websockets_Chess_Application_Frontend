/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: copyright-newsletter.component.ts
 * Last modified: 24/08/2022, 21:17
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
import * as moment from "moment";

//----------------------------------------------------------------------------------------------------------------------

@Component({
    selector: "mgchess-copyright-newsletter",
    templateUrl: "./copyright-newsletter.component.html",
    styleUrls: [ "./copyright-newsletter.component.scss" ]
})
export class CopyrightNewsletterComponent {

    readonly _initialYear: number = 2022;
    readonly _currYear: number = moment().year();

    copyYearsConcate(): string {
        return this._currYear > this._initialYear ? `${this._initialYear} - ${this._currYear}` : String(this._currYear);
    };
}
