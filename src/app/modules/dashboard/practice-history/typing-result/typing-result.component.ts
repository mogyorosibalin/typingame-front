import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { TypingService } from '../../../../core/services/typing.service';

import { CharFeedback } from '../../../../shared/enums/char-feedback.enum';

@Component({
  selector: 'app-typing-result',
  templateUrl: './typing-result.component.html',
  styleUrls: ['./typing-result.component.sass']
})
export class TypingResultComponent implements OnInit {

  @Input() typingResult;
  @Input() currentId;
  @Input() length;

  @ViewChild('textContainer') textContainer: ElementRef;

  constructor(private typingService: TypingService,
              private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.typingResult);
    this.typingService.loadTextToDom(this.typingResult.text.text, this.textContainer);
    const chars = this.textContainer.nativeElement.querySelectorAll('span');
    for (let i = 0; i < chars.length - 2; i++) {
      this.renderer.removeClass(chars[i], 'active');
      this.renderer.addClass(chars[i], 'correct');
    }
    this.typingService.updateTextAfterPracticeFinished(this.textContainer, this.typingResult.chars);
  }

  getSpeed() {
    return Math.round((this.typingResult.chars.length / 5) / (this.typingResult.timeSec / 60));
  }

  getAccuracy() {
    return Math.round(
      (this.typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / this.typingResult.chars.length) * 100 * 100) / 100;
  }

}
