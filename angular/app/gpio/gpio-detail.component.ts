import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { GpioInterface } from './gpio.component.class';
import { GpioService } from './gpio.service';

@Component({
    selector: 'app-gpio-detail',
    templateUrl: './gpio-detail.component.html',
    styleUrls: ['./gpio-detail.component.css']
})
export class GpioDetailComponent implements OnInit {

    gpio: GpioInterface;

    constructor(
        private gpioService: GpioService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.gpioService.getGpio(+params.get('id')))
            .subscribe(gpio => this.gpio = gpio);
    }

    save(): void {
        this.gpioService.update(this.gpio)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
