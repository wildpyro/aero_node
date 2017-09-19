import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    gpios = new GpioCollection(null);
    dataSource: GpioDataSource | null;
    displayedColumns = ['pin', 'scheduleName'];

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
    }

    onSelect(gpio: GpioInterface): void {
        this.selectedPin = gpio;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedPin.id]);
    }
}
