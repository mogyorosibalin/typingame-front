import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpened]'
})
export class OpenedDirective {

  @HostBinding('class.opened') isOpened = false;

  @HostListener('click') click() {
    this.isOpened = !this.isOpened;
  }

  constructor() { }

}
