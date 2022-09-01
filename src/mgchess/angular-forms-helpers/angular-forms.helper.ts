/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: angular-forms.helper.ts
 * Last modified: 25/08/2022, 21:23
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

import { AbstractControl, FormGroup } from "@angular/forms";

//----------------------------------------------------------------------------------------------------------------------

export class AngularFormsHelper {

    private readonly _formGroup: FormGroup;

    constructor(formGround: FormGroup) {
        this._formGroup = formGround;
    };

    field(fieldname: string): AbstractControl<any, any> {
        if (!this._formGroup) throw new Error("Form grounp is not valid");
        const field = this._formGroup.get(fieldname);
        if (!field) throw new Error(`Field ${fieldname} not exist in selected form group`);
        return field;
    };

    fieldHasAnyErrors(fieldname: string): boolean {
        return this.field(fieldname).touched && this.field(fieldname).dirty && !this.field(fieldname).valid;
    };

    getAllFieldsAndCleanup<T>(activeReset: boolean = true): T {
        if (!this._formGroup) throw new Error("Form group is not valid");
        const fieldsObject = this._formGroup.getRawValue() as T;
        if (activeReset) {
            this._formGroup.clearValidators();
            this._formGroup.reset();
        }
        return fieldsObject;
    };
}
