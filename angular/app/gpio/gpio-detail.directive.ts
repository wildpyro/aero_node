import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[gpioDetail]' //CSS class that triggers the directive
})
export class GpioDetailDirective {
    @Output() close: EventEmitter<any> = new EventEmitter();

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event);
        let x = event.keyCode;

        if (x === 27) {
            this.close.emit('close');
            console.log('KeyDown!');
        }
    }

    @HostListener('onClick')
    onClick() {
        this.close.emit('close');
    }

    constructor() { return; }
}
