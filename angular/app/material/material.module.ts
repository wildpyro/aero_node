import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    MdToolbarModule,
    MdTableModule,
    MdSortModule,
    MdPaginatorModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdMenuModule,
        MdIconModule,
        MdToolbarModule,
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
        MdToolbarModule,
        MdTableModule,
        MdSortModule,
        MdPaginatorModule,
        FlexLayoutModule
    ],
    declarations: []
})
export class MaterialModule { }
