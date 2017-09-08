import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesRoutingModule } from './routes/routes-routing.module';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GpioComponent } from './gpio/gpio.component';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    declarations: [
        AppComponent,
        ScheduleComponent,
        GpioComponent,
        TaskComponent,
        NotFoundComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoutesRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
