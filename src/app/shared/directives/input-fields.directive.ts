import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appInputFilled]'
})
export class InputFilledDirective implements OnInit {

  @HostBinding('class.filled') isFilled: boolean;

  @HostListener('focusout') focusOut() {
    this.isFilled = this.element.nativeElement.value !== '';
  }

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.isFilled = this.element.nativeElement.value !== '';
  }

}
