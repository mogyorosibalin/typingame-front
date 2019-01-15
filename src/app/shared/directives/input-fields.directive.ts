import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFilled]'
})
export class InputFilledDirective implements AfterViewInit {

  @HostBinding('class.filled') isFilled = false;

  @HostListener('focusout') focusOut() {
    this.isFilled = this.element.nativeElement.value !== '';
  }

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isFilled = this.element.nativeElement.value !== '';
    }, 1);
  }

}
