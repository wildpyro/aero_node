import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    title = 'List of available schedules';

    menuOptions = [
        { name: 'Add', route: 'landing' },
        { name: 'Remove', route: 'gpio' },
        { name: 'Modify', route: 'tasks' }
    ];

    ngOnInit() {
        return;
    }

}
