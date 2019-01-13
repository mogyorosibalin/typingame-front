import { Injectable } from '@angular/core';

import { CharFeedback } from '../../shared/enums/char-feedback.enum';

@Injectable()
export class UserService {

  private profile: any;
  private typingResults: any;

  constructor() { }

  setTypingResults(typingResults: any) {
    this.typingResults = typingResults;
  }

  getTypingResults() {
    return this.typingResults;
  }

  setProfile(profile: any) {
    this.profile = profile;
  }

  getHash(): string {
    return this.profile ? this.profile.sub : '';
  }

  getProfilePicture(): string {
    return this.profile ? this.profile.picture : 'http://www.promaxindia.tv/wp-content/uploads/2017/03/no_image_user.png';
  }

  getNickname(): string {
    return this.profile ? this.profile.nickname : 'guest';
  }

  getAverageSpeed(): number {
    let typingResults = [];
    if (localStorage.getItem('typingResults')) {
      typingResults = JSON.parse(localStorage.getItem('typingResults'));
    } else if (this.typingResults) {
      typingResults = this.typingResults;
    }
    if (typingResults.length !== 0) {
      let speedSum = 0;
      for (const typingResult of typingResults) {
        speedSum += Math.round((typingResult.chars.length / 5) / (typingResult.timeMiliSec / 1000 / 60));
      }
      return Math.round(speedSum / typingResults.length);
    }
    return 0;
  }

  getAverageAccuracy(): number {
    let typingResults = [];
    if (localStorage.getItem('typingResults')) {
      typingResults = JSON.parse(localStorage.getItem('typingResults'));
    } else if (this.typingResults) {
      typingResults = this.typingResults;
    }
    if (typingResults.length !== 0) {
      let accuracySum = 0;
      for (const typingResult of typingResults) {
        accuracySum += Math.round(
          (typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / typingResult.chars.length) * 100 * 100) / 100;
      }
      return Math.round(accuracySum / typingResults.length * 100) / 100;
    }
    return 0;
  }

  getTypingTimes(): number {
    let typingResults = [];
    if (localStorage.getItem('typingResults')) {
      typingResults = JSON.parse(localStorage.getItem('typingResults'));
    } else if (this.typingResults) {
      typingResults = this.typingResults;
    }
    return typingResults.length;
  }

}
