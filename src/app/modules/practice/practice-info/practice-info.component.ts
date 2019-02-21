import { Component, OnInit } from '@angular/core';

import { TypingService } from '../../../core/services/typing.service';

import { Text } from '../../../shared/models/text.model';

@Component({
  selector: 'app-practice-info',
  templateUrl: './practice-info.component.html',
  styleUrls: ['./practice-info.component.sass']
})
export class PracticeInfoComponent implements OnInit {

  text: Text;

  constructor(private typingService: TypingService) { }

  ngOnInit() {
    this.text = this.typingService.getText();
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

  getPoints() {
    return this.typingService.getPoints();
  }

}
