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
    let speedSum = 0;
    if (localStorage.getItem('typingResults')) {
      this.typingResults = JSON.parse(localStorage.getItem('typingResults'));
      for (let typingResult of this.typingResults) {
        speedSum += typingResult.speed;
      }
    } else if (this.typingResults) {
      for (let typingResult of this.typingResults) {
        speedSum += Math.round((typingResult.chars.length / 5) / (typingResult.timeSec / 60));
      }
    }
    return this.typingResults && this.typingResults.length !== 0 ? Math.round(speedSum / this.typingResults.length) : 0;
  }

  getAverageAccuracy(): number {
    let accuracySum = 0;
    if (localStorage.getItem('typingResults')) {
      this.typingResults = JSON.parse(localStorage.getItem('typingResults'));
      for (let typingResult of this.typingResults) {
        accuracySum += typingResult.accuracy;
      }
    } else if (this.typingResults) {
      for (let typingResult of this.typingResults) {
        accuracySum += Math.round(
          (typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / typingResult.chars.length) * 100 * 100) / 100;
      }
    }
    return this.typingResults && this.typingResults.length !== 0 ? Math.round(accuracySum / this.typingResults.length * 100) / 100 : 0;
  }

  getTypingTimes(): number {
    if (localStorage.getItem('typingResults')) {
      this.typingResults = JSON.parse(localStorage.getItem('typingResults'));
    }
    return this.typingResults ? this.typingResults.length : 0;
  }

}
