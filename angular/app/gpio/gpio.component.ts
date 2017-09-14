import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Gpio } from './gpio.component.class';
import { GpioService } from './gpio.service';

@Component({
    selector: 'app-gpio',
    templateUrl: './gpio.component.html',
    styleUrls: ['./gpio.component.css'],
    providers: [GpioService]
})

export class GpioComponent implements OnInit {

    pinList: Gpio[];
    selectedPin: Gpio;

    constructor(
        private gpioService: GpioService,
        private router: Router
    ) { }

    getGPIOs(): void {
        this.gpioService
            .getGpios()
            .then(pinList => this.pinList = pinList);
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

    delete(gpio: Gpio): void {
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

    onSelect(gpio: Gpio): void {
        this.selectedPin = gpio;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedPin.id]);
    }

}
