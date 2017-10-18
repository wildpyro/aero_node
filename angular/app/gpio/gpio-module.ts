//Angular modules for this package
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

import { GpioComponent } from './gpio.component';
import { GpioService } from './gpio.service';
import { GpioDetailDirective } from './gpio-detail.directive';

import { DialogDeleteComponent } from '../core/dialog-delete.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule
    ],
    exports: [
        GpioComponent,
        GpioDetailDirective,
    ],
    declarations: [
        GpioComponent,
        GpioDetailDirective,
    ],
    providers: [
        GpioService
    ],
    entryComponents: [
        DialogDeleteComponent
    ]
})
export class GpioModule { }
