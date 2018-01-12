import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskInterface, TaskCollection } from './task.component.class';
import { TaskService } from './task.service';
import { TaskDataSource } from './task-data-source';
import { DialogDeleteComponent } from '../core/dialog-delete.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
    providers: [TaskService],
})
export class TaskComponent implements OnInit {

    //Header fields
    title = 'List of Tasks:';

    menuOptions = [
        { name: 'Add New', href: 'add-new' }
    ];

    tasks: TaskDataSource | null;

    //Detail form
    detailAddForm: FormGroup;
    task: TaskInterface | null;
    addNew: boolean;

    constructor(
        private taskService: TaskService,
        private router: Router,
        public dialog: MdDialog
    ) { }

    private createForm() {
        this.detailAddForm = new FormGroup({
            name: new FormControl('', Validators.required),
            scheduleId: new FormControl('', Validators.required),
            start: new FormControl('', Validators.required),
            end: new FormControl('', Validators.required),
        });
    }

    getTasks(): void {
        this.taskService
            .getTasks()
            .then(result => {
                this.tasks = new TaskDataSource(new TaskCollection(result));
            });

    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.taskService.create(name)
            .then(task => {
                this.tasks.data.data.push(task);
            });
    }

    delete(task: TaskInterface): void {
        this.taskService
            .delete(task.id)
            .then();
    }

    /**
     * Send an update from the detail panel
     */
    update(task: TaskInterface): void {
        this.taskService
            .update(task)
            .then(() => this.getTasks());
    }

    ngOnInit() {
        this.getTasks();
    }

    /**
     * For adding a new task
     * @param task
     */
    onAdd(task: TaskInterface): void {
        this.task = null;
        this.addNew = true;
    }

    /**
     * Set the task and update it
     * @param gpio
     */
    onSelect(task: TaskInterface): void {
        if (task) {
            this.task = null;
        }
        else {
            this.task = task;
        }
    }

    openDeleteDialog(gpio: TaskInterface): void {
        let dialogRef = this.dialog.open(DialogDeleteComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(gpio);
            }
        });
    }

    unSet(): void {
        this.task = null;
        this.addNew = false;
    }
}
