import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFilled]'
})
export class InputFilledDirective {

  @HostBinding('class.filled') isFilled = false;

  @HostListener('focusout') focusOut() {
    this.isFilled = this.element.nativeElement.value !== '';
  }

  constructor(private element: ElementRef) { }

}
