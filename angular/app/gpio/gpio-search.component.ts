import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { GpioSearchService } from './gpio-search.service';
import { GpioInterface } from './gpio.component.class';

@Component({
    selector: 'gpio-search',
    templateUrl: './gpio-search.component.html',
    styleUrls: ['./gpio-search.component.css'],
    providers: [GpioSearchService]
})
export class GpioSearchComponent implements OnInit {
    gpioes: Observable<GpioInterface[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private gpioSearchService: GpioSearchService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.gpioes = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.gpioSearchService.search(term)
                // or the observable of empty gpioes if there was no search term
                : Observable.of<GpioInterface[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<GpioInterface[]>([]);
            });
    }

    gotoDetail(gpio: GpioInterface): void {
        let link = ['/detail', gpio.id];
        this.router.navigate(link);
    }
}
