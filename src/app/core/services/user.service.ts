import {Injectable} from '@angular/core';

import { UtilService } from './util.service';
import { CharFeedback } from '../../shared/enums/char-feedback.enum';

@Injectable()
export class UserService {

  private profile: any;
  private typingResults: any[];

  constructor(private util: UtilService) { }

  setTypingResults(typingResults: any) {
    this.typingResults = typingResults;
  }

  getTypingResults() {
    return this.typingResults.slice();
  }

  setProfile(profile: any) {
    this.profile = profile;
  }

  getHash(): string {
    return this.profile ? (<string>this.profile.sub).split('|')[1] : '';
  }

  getProfilePicture(): string {
    return this.profile ? this.profile.picture : 'http://www.promaxindia.tv/wp-content/uploads/2017/03/no_image_user.png';
  }

  getFirstName(): string {
    return this.profile ? this.profile.given_name : '';
  }

  getLastName(): string {
    return this.profile ? this.profile.family_name : '';
  }

  getNickname(): string {
    return this.profile ? this.profile.nickname : 'guest';
  }

  private extractTypingResults() {
    let typingResults = [];
    if (localStorage.getItem('typingResults')) {
      typingResults = JSON.parse(localStorage.getItem('typingResults'));
    } else if (this.typingResults) {
      typingResults = this.typingResults.slice();
    }
    return typingResults;
  }

  getSpeed(lastNum: number = 0): number {
    const typingResults = this.extractTypingResults();
    if (lastNum === 0) {
      return typingResults.length !== 0 ? this.getAverageSpeedImpl(typingResults) : 0;
    } else {
      lastNum = Math.min(lastNum, typingResults ? typingResults.length : 0);
      lastNum = Math.max(lastNum, 0);
      return typingResults.length !== 0 ? this.getAverageSpeedImpl(typingResults.slice(0, lastNum)) : 0;
    }
  }

  private getAverageSpeedImpl(typingResults: any[]): number {
    let speedSum = 0;
    for (const typingResult of typingResults) {
      speedSum += Math.round((typingResult.chars.length / 5) / (typingResult.timeMiliSec / 1000 / 60));
    }
    return Math.round(speedSum / typingResults.length);
  }

  getRealSpeed(lastNum: number = 0): number {
    const typingResults = this.extractTypingResults();
    if (lastNum === 0) {
      return typingResults.length !== 0 ? this.getRealAverageSpeedImpl(typingResults.slice()) : 0;
    } else {
      lastNum = Math.min(lastNum, typingResults ? typingResults.length : 0);
      lastNum = Math.max(lastNum, 0);
      return typingResults.length !== 0 ? this.getRealAverageSpeedImpl(typingResults.slice(0, lastNum)) : 0;
    }
  }

  private getRealAverageSpeedImpl(typingResults: any[]): number {
    let charsPressed = 0;
    let timeElapsed = 0;
    for (const typingResult of typingResults) {
      charsPressed += typingResult.chars.length;
      timeElapsed += typingResult.timeMiliSec;
    }
    return Math.round(((charsPressed / 5) / (timeElapsed / 1000 / 60)));
  }

  getAccuracy(lastNum: number = 0): number {
    const typingResults = this.extractTypingResults();
    if (lastNum === 0) {
      return typingResults.length !== 0 ? this.getAverageAccuracyImpl(typingResults) : 0;
    } else {
      lastNum = Math.min(lastNum, typingResults ? typingResults.length : 0);
      lastNum = Math.max(lastNum, 0);
      return typingResults.length !== 0 ? this.getAverageAccuracyImpl(typingResults.slice(0, lastNum)) : 0;
    }
  }

  private getAverageAccuracyImpl(typingResults: any[]): number {
    let accuracySum = 0;
    for (const typingResult of typingResults) {
      accuracySum += Math.round(
        (typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / typingResult.chars.length) * 100 * 100) / 100;
    }
    return this.util.getPercentage(accuracySum / (typingResults.length * 100));
  }

  getRealAccuracy(lastNum: number = 0): number {
    const typingResults = this.extractTypingResults();
    if (lastNum === 0) {
      return this.getRealAverageAccuracyImpl(typingResults.slice());
    } else {
      lastNum = Math.min(lastNum, typingResults ? typingResults.length : 0);
      lastNum = Math.max(lastNum, 0);
      return this.getRealAverageAccuracyImpl(typingResults.slice(0, lastNum));
    }
  }

  private getRealAverageAccuracyImpl(typingResults: any[]): number {
    let charsPressed = 0;
    let goodChars = 0;
    for (const typingResult of typingResults) {
      charsPressed += typingResult.chars.length;
      goodChars += typingResult.chars.filter(good => good !== CharFeedback.WRONG).length;
    }
    return this.util.getPercentage(goodChars / charsPressed);
  }

  getTypingTimes(): number {
    return this.extractTypingResults().length;
  }

  getPoints(): number {
    return this.extractTypingResults().reduce((a, b) => a + b.points, 0);
  }

}
