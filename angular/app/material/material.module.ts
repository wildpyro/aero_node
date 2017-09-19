import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdIconModule, MdToolbarModule, MdTableModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdMenuModule,
        MdIconModule,
        MdToolbarModule,
        MdTableModule
    ],
    exports: [
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdMenuModule,
        MdIconModule,
        MdToolbarModule,
        MdTableModule
    ],
    declarations: []
})
export class MaterialModule { }
