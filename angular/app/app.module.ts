import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { MaterialModule } from './material/material.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data/in-memory-data-service';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GpioComponent } from './gpio/gpio.component';
import { GpioService } from './gpio/gpio.service';
import { GpioSearchComponent } from './gpio/gpio-search.component';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
        RoutesRoutingModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        ScheduleComponent,
        GpioComponent,
        TaskComponent,
        NotFoundComponent,
        LandingComponent,
        GpioSearchComponent
    ],
    providers: [], //inject global services/components if you want them here. Or put them in the individual component
    bootstrap: [AppComponent]
})

export class AppModule { }
