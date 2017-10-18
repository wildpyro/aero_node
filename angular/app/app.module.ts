//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

//App component modules
import { MaterialModule } from './material.module';
import { GpioModule } from './gpio/gpio-module';
import { CoreModule } from './core/core.module';

//Comonents
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TaskComponent } from './task/task.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        RoutesRoutingModule,
        Ng2PageScrollModule,
        GpioModule,
        CoreModule,
    ],
    declarations: [
        AppComponent,
        ScheduleComponent,
        TaskComponent,
        LandingComponent
    ],
    providers: [], //inject global services/components if you want them here. Or put them in the individual component
    bootstrap: [AppComponent]
})

export class AppModule { }
