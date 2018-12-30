import { Component, Input, OnInit } from '@angular/core';

import { TypingService } from '../../../shared/services/typing.service';

import { TypingInfo } from '../../../shared/models/typing-info.model';

@Component({
  selector: 'app-practice-info',
  templateUrl: './practice-info.component.html',
  styleUrls: ['./practice-info.component.sass']
})
export class PracticeInfoComponent implements OnInit {

  @Input() typingInfo: TypingInfo;

  constructor(private typingService: TypingService) { }

  ngOnInit() {
  }

  onPracticeAgain() {
    this.typingService.typingAgain.next();
  }

  getAccuracy() {
   return this.typingService.getAccuracy();
  }

  getElapsedTime() {
    return Math.round(this.typingService.getElapsedTime() / 1000);
  }

  getSpeed() {
    return this.typingService.getFinalSpeed();
  }

}
