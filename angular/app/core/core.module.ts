//Angular modules for this package
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { DialogDeleteComponent } from './dialog-delete.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        DialogDeleteComponent,
        NotFoundComponent,
    ],
    declarations: [
        DialogDeleteComponent,
        NotFoundComponent,
    ]
})
export class CoreModule { }
