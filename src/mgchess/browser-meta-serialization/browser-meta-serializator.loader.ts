/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl>
 *
 * File name: browser-meta-serializator.loader.ts
 * Last modified: 21/08/2022, 23:04
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

import { Meta, Title } from "@angular/platform-browser";
import * as META_DATA from "../../assets/static-data/browser-metadata.json";

import { SingleModuleType, SinglePageType } from "./browser-meta-serializator.types";
import { BrowserMetaSerializatorModel, SinglePageMetaContent } from "./browser-meta-serializator.model";

//----------------------------------------------------------------------------------------------------------------------

export abstract class BrowserMetaSerializatorLoader {

    private readonly titleService: Title;
    private readonly metaService: Meta;
    private readonly module: SingleModuleType;
    private readonly page: SinglePageType;

    private serializedData: BrowserMetaSerializatorModel | null = null;

    //------------------------------------------------------------------------------------------------------------------

    protected constructor(
        titleService: Title, metaService: Meta, module: SingleModuleType, page: SinglePageType,
        prefixActive: boolean = true
    ) {
        this.metaService = metaService;
        this.titleService = titleService;
        this.module = module;
        this.page = page;
        this.deserializeData();
        this.updateMetaWebContentData(prefixActive);
    };

    //------------------------------------------------------------------------------------------------------------------

    private deserializeData() {
        const { separator, prefix, metaContent } = META_DATA;
        const pagesData: Map<SingleModuleType, Array<SinglePageMetaContent>> = new Map();
        Object.keys(metaContent).forEach(key => {
            const multiplePagesObjectData = metaContent[key as keyof typeof metaContent]
                .map(({ pageId, title, description }) =>
                    new SinglePageMetaContent(pageId as SinglePageType, title, description));
            pagesData.set(key as SingleModuleType, multiplePagesObjectData);
        });
        this.serializedData = new BrowserMetaSerializatorModel(separator, prefix, pagesData);
    };

    //------------------------------------------------------------------------------------------------------------------

    private updateMetaWebContentData(prefixActive: boolean): void {
        if (this.serializedData === null) return;
        const { __prefix, __separator } = this.serializedData;
        const extractedMetadata = this.serializedData.extractMetaContentBasePageAndModuleType(this.module, this.page);
        const titleWithPrefix = `${extractedMetadata.title} ${__separator} ${__prefix}`;
        this.titleService.setTitle(prefixActive ? titleWithPrefix : extractedMetadata.title);
        this.metaService.updateTag({ name: "description", content: extractedMetadata.description });
    };
}
