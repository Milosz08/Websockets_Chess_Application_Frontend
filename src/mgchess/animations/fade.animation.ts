/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: fade.animation.ts
 * Last modified: 16/09/2022, 21:03
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

import { animate, style, transition, trigger } from "@angular/animations";

//----------------------------------------------------------------------------------------------------------------------

export const FadeOutAnimation = trigger("FadeOutAnimation", [
    transition(
        ":leave",
        [
            style({ opacity: 1 }),
            animate(".5s ease-out", style({ opacity: 0 })),
        ],
    ),
]);

//----------------------------------------------------------------------------------------------------------------------

export const FadeInOutAnimation = trigger('FadeInOutAnimation', [
    transition(
        ':enter',
        [
            style({ opacity: 0 }),
            animate('.2s ease-out', style({ opacity: 1 })),
        ],
    ),
    transition(
        ':leave',
        [
            style({ opacity: 1 }),
            animate('.2s ease-out', style({ opacity: 0 })),
        ],
    ),
]);

//----------------------------------------------------------------------------------------------------------------------

export const SlideBottomTopAnimation = trigger('SlideBottomTopAnimation', [
    transition(
        ':enter',
        [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            animate('.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ],
    ),
    transition(
        ':leave',
        [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('.2s ease-out', style({ opacity: 0, transform: 'translateY(20px)' })),
        ],
    ),
]);
