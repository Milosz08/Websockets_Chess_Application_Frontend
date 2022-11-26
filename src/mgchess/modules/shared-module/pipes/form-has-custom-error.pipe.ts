/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 *  File name: form-has-custom-error.pipe.ts
 *  Last modified: 26/11/2022, 18:18
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

import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup } from "@angular/forms";

//----------------------------------------------------------------------------------------------------------------------

@Pipe({
    name: "formHasCustomError",
    pure: false,
})
export class FormHasCustomErrorPipe implements PipeTransform {

    transform(formGroup: FormGroup, errorName: string): boolean {
        if (!formGroup) {
            throw new Error("Form group is not valid");
        }
        return formGroup.errors?.[errorName];
    };
}
