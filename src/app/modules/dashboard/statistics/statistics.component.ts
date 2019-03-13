import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { CharFeedback } from '../../../shared/enums/char-feedback.enum';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit {

  typingResults: any[];
  chars = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.typingResults = this.userService.getTypingResults();
    this.createCharsArray();
  }

  createCharsArray() {
    let char;
    const charsObj = [];
    for (const typingResult of this.typingResults) {
      for (let i = 0; i < typingResult.chars.length; i++) {
        char = typingResult.text.text.charAt(i).toLowerCase();
        if (!charsObj[char]) {
          charsObj[char] = { good: 0, wrong: 0, char: char };
        }
        if (typingResult.chars[i] === CharFeedback.WRONG) {
          charsObj[char].wrong++;
        } else {
          charsObj[char].good++;
        }
      }
    }
    const charsKeys = Object.keys(charsObj);
    for (const charsKey of charsKeys) {
      this.chars.push(charsObj[charsKey]);
    }
  }

}
