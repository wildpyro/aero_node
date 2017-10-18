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
    MdInputModule,
    MdDialogModule,
} from '@angular/material';

import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

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
        MdInputModule,
        FlexLayoutModule,
        FormsModule,
        MdDialogModule,
        ReactiveFormsModule,
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
        MdInputModule,
        FlexLayoutModule,
        FormsModule,
        MdDialogModule,
        ReactiveFormsModule,
    ],
    declarations: []
})
export class MaterialModule { }
