import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Aero_node';

    menuOptions = [
        { name: 'Home', route: 'landing' },
        { name: 'Pin Config', route: 'gpio' },
        { name: 'Tasks', route: 'tasks' },
        { name: 'Schedule', route: 'schedule' }
    ];
}
