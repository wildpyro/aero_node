//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesRoutingModule } from './routes/routes-routing.module';

//App modules
import { MaterialModule } from './material.module';
import { GpioModule } from './gpio/gpio-module';

//Comonents
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        BrowserModule
        , BrowserAnimationsModule
        , FormsModule
        , HttpClientModule
        , MaterialModule
        , RoutesRoutingModule
        , GpioModule
    ],
    declarations: [
        AppComponent
        , ScheduleComponent
        , TaskComponent
        , NotFoundComponent
        , LandingComponent
    ],
    providers: [], //inject global services/components if you want them here. Or put them in the individual component
    bootstrap: [AppComponent]
})

export class AppModule { }
