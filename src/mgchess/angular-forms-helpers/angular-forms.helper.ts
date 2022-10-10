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

    field(fieldname: string, form: FormGroup): AbstractControl<any, any> {
        if (!form) throw new Error("Form grounp is not valid");
        const field = form.get(fieldname);
        if (!field) throw new Error(`Field ${fieldname} not exist in selected form group`);
        return field;
    };

    //------------------------------------------------------------------------------------------------------------------

    static field(fieldname: string, form: FormGroup): AbstractControl<any, any> {
        return new AngularFormsHelper().field(fieldname, form);
    };

    //------------------------------------------------------------------------------------------------------------------

    fieldHasAnyErrors(fieldname: string, form: FormGroup): boolean {
        return this.field(fieldname, form).touched && this.field(fieldname, form).dirty
            && !this.field(fieldname, form).valid;
    };

    //------------------------------------------------------------------------------------------------------------------

    extractFormFields<T>(form: FormGroup, activeReset: boolean = true): T {
        if (!form) throw new Error("Form group is not valid");
        const fieldsObject = form.getRawValue() as T;
        if (activeReset) {
            form.clearValidators();
            form.reset();
        }
        return fieldsObject;
    };

    //------------------------------------------------------------------------------------------------------------------

    static extractFormFields<T>(form: FormGroup, activeReset: boolean = true): T {
        return new AngularFormsHelper().extractFormFields<T>(form, activeReset);
    };

    //------------------------------------------------------------------------------------------------------------------

    checkCustomError(form: FormGroup, errorName: string): boolean {
        if (!form) throw new Error("Form grounp is not valid");
        return form.errors?.[errorName];
    };
}
