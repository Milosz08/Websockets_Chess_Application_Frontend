/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: BrowserTitleSerialized.ts
 * Last modified: 21/08/2022, 23:09
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

import { SingleModuleType, SinglePageType } from "./BrowserMetaSerializationTypes";

//----------------------------------------------------------------------------------------------------------------------

export class BrowserMetaSerialized {
    private readonly separator: string;
    private readonly prefix: string;
    private metaContent: Map<SingleModuleType, Array<SinglePageMetaContent>> = new Map();

    constructor(separator: string, prefix: string, metaContent: Map<SingleModuleType, Array<SinglePageMetaContent>>) {
        this.separator = separator;
        this.prefix = prefix;
        this.metaContent = metaContent;
    };

    extractMetaContentBasePageAndModuleType(module: SingleModuleType, page: SinglePageType): ExtractedMetaTypes {
        const findPages = this.metaContent.get(module)
        const extractedPage = findPages!.find(p => p.__pageId === page);
        if (findPages === undefined || extractedPage === undefined) return { title: "", description: "" };
        return {
            title: extractedPage.__title,
            description: extractedPage.__description,
        }
    };

    get __separator(): string {
        return this.separator;
    };

    get __prefix(): string {
        return this.prefix;
    };
}

export interface ExtractedMetaTypes {
    title: string;
    description: string;
}

//----------------------------------------------------------------------------------------------------------------------

export class SinglePageMetaContent {
    private readonly pageId: SinglePageType;
    private readonly title: string;
    private readonly description: string;

    constructor(pageId: SinglePageType, title: string, description: string) {
        this.pageId = pageId;
        this.title = title;
        this.description = description;
    };

    get __title(): string {
        return this.title;
    };

    get __description(): string {
        return this.description;
    };

    get __pageId(): SinglePageType {
        return this.pageId;
    };
}
