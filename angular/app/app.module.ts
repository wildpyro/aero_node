import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GpioComponent } from './gpio/gpio.component';
import { GpioService } from './gpio/gpio.service';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RoutesRoutingModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        ScheduleComponent,
        GpioComponent,
        TaskComponent,
        NotFoundComponent,
        LandingComponent
    ],
    providers: [], //inject global services if you want them here. Or put them in the individual component
    bootstrap: [AppComponent]
})

export class AppModule { }
