import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';

import { GpioInterface, GpioCollection } from './gpio.component.class';
import { GpioService } from './gpio.service';
import { GpioDataSource } from './gpio-data-source';

@Component({
    selector: 'app-gpio',
    templateUrl: './gpio.component.html',
    styleUrls: ['./gpio.component.css'],
    providers: [GpioService]
})

export class GpioComponent implements OnInit {

    pinList: GpioInterface[];
    selectedPin: GpioInterface;

    dataSource: GpioDataSource | null;
    sortedData: GpioDataSource | null;
    displayedColumns = ['pin', 'scheduleName'];
    @ViewChild('filter') filter: ElementRef;

    constructor(
        private gpioService: GpioService,
        private router: Router
    ) { }

    getGPIOs(): void {
        this.gpioService
            .getGpios()
            .then(result => this.dataSource = new GpioDataSource(new GpioCollection(result)));
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.gpioService.create(name)
            .then(gpio => {
                this.pinList.push(gpio);
                this.selectedPin = null;
            });
    }

    delete(gpio: GpioInterface): void {
        this.gpioService
            .delete(gpio.id)
            .then(() => {
                this.pinList = this.pinList.filter(h => h !== gpio);
                if (this.selectedPin === gpio) { this.selectedPin = null; }
            });
    }

    ngOnInit(): void {
        this.getGPIOs();
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    onSelect(gpio: GpioInterface): void {
        this.selectedPin = gpio;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedPin.id]);
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
