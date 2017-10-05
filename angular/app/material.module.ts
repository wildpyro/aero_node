import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    MdTableModule,
    MdToolbarModule,
    MdTooltipModule,
    MdSortModule,
    MdPaginatorModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdIconModule,
        MdMenuModule,
        MdToolbarModule,
        MdTooltipModule,
        MdTableModule,
        MdSortModule,
        MdPaginatorModule,
        FlexLayoutModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdMenuModule,
        MdIconModule,
        MdTableModule,
        MdToolbarModule,
        MdTooltipModule,
        MdSortModule,
        MdPaginatorModule,
        FlexLayoutModule,
    ],
    declarations: []
})
export class MaterialModule { }
