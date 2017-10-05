//Angular modules for this package
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

import { GpioComponent } from '../gpio/gpio.component';
import { GpioService } from '../gpio/gpio.service';
import { GpioDetailDirective } from '../gpio/gpio-detail.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        HttpClientModule
    ],
    exports: [
        GpioComponent
        , GpioDetailDirective
    ],
    declarations: [
        GpioComponent
        , GpioDetailDirective
    ],
    providers: [
        GpioService
    ]
})
export class GpioModule { }
