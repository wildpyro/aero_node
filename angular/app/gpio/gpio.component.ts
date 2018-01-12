import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Sort, MdDialog, MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { GpioInterface, GpioCollection } from './gpio.component.class';
import { GpioService } from './gpio.service';
import { GpioDataSource } from './gpio-data-source';
import { DialogDeleteComponent } from '../core/dialog-delete.component';

@Component({
    selector: 'gpio',
    templateUrl: './gpio.component.html',
    styleUrls: ['./gpio.component.css'],
    providers: [GpioService],
})

export class GpioComponent implements OnInit {

    //Header fields
    title = 'List of IO Pins:';

    //table filter
    @ViewChild('filter') filter: ElementRef;

    //Detail form
    detailForm: FormGroup;
    selectedPin: GpioInterface | null;

    //Table fields
    private pristine: GpioDataSource | null;
    dataSource: GpioDataSource | null;
    displayedColumns = ['pin', 'scheduleName', 'buttons'];
    //    sortedData: GpioDataSource | null;

    constructor(
        private gpioService: GpioService,
        private router: Router,
        public dialog: MdDialog
    ) { }

    private createForm() {
        this.detailForm = new FormGroup({
            pin: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
            schedule: new FormControl('', Validators.required),
        });
    }

    getGPIOs(): void {
        this.gpioService
            .getGpios()
            .then(result => {
                this.dataSource = new GpioDataSource(new GpioCollection(result));
                this.pristine = new GpioDataSource(new GpioCollection(result));
            });
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.gpioService.create(name)
            .then(gpio => {
                this.dataSource.data.data.push(gpio);
                this.pristine.data.data.push(gpio);
                this.unset();
            });
    }

    delete(gpio: GpioInterface): void {
        this.gpioService
            .delete(gpio.id)
            .then(() => {
                //this.dataSource.data.data = this.dataSource.data.data.filter(h => h !== gpio);
                if (this.selectedPin === gpio) { this.selectedPin = null; }
            });
    }

    /**
     * Send an update from the detail panel
     */
    update(): void {
        console.log(this.selectedPin);
        this.gpioService.update(this.selectedPin)
            .then(() => this.unset);
    }

    ngOnInit(): void {
        this.getGPIOs();
        this.createForm();
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    /**
     * Set pin to one from table
     * @param gpio
     */
    onSelect(gpio: GpioInterface): void {
        if (this.selectedPin) {
            this.selectedPin = null;
        }
        else {
            this.selectedPin = gpio;
        }
    }

    openDeleteDialog(gpio: GpioInterface): void {
        let dialogRef = this.dialog.open(DialogDeleteComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(gpio);
            }
        });
    }

    /**
     * Deselect the pin
     */
    unset() {
        this.selectedPin = null;
        //Reset the table?
        this.dataSource.reset();
    }

    /*
    sortData(sort: Sort) {
        const data = this.dataSource;

        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            let isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name': return compare(a.name, b.name, isAsc);
                case 'calories': return compare(+a.calories, +b.calories, isAsc);
                case 'fat': return compare(+a.fat, +b.fat, isAsc);
                case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
                case 'protein': return compare(+a.protein, +b.protein, isAsc);
                default: return 0;
            }
        });

        function compare(a: any, b: any, isAsc: boolean) {
            return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
        }
    }
    */
}
