import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from '../schedule/schedule.component';
import { GpioComponent } from '../gpio/gpio.component';
import { TaskComponent } from '../task/task.component';
import { NotFoundComponent } from '../core/not-found.component';
import { LandingComponent } from '../landing/landing.component';

const routes: Routes = [
    { path: 'gpio', component: GpioComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'tasks', component: TaskComponent },
    { path: 'landing', component: LandingComponent },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes
            // the generator builds a for Child but that doesn't work for some reason,{ enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [RouterModule]
})
export class RoutesRoutingModule { }
