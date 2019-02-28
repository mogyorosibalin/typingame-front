import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { UserService } from '../../../core/services/user.service';
import {CharFeedback} from '../../../shared/enums/char-feedback.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  lastNum = 10;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  changeLast(amount: number) {
    this.lastNum += amount;
    this.lastNum = Math.max(this.lastNum, 1);
    this.lastNum = Math.min(this.lastNum, this.userService.getTypingTimes());
  }

  getPicture(): string {
    return this.userService.getProfilePicture();
  }

  getName(): string {
    return this.userService.getFirstName() + ' ' + this.userService.getLastName();
  }

  getNickname(): string {
    return this.userService.getNickname();
  }

  getTypingTimes(): number {
    return this.userService.getTypingTimes();
  }

  getPoints(): number {
    return this.userService.getPoints();
  }

  getAverageSpeedLast(): number {
    return this.userService.getSpeed(this.lastNum);
  }

  getRealAverageSpeedLast(): number {
    return this.userService.getRealSpeed(this.lastNum);
  }

  getAverageSpeedAll(): number {
    return this.userService.getSpeed();
  }

  getRealAverageSpeedAll(): number {
    return this.userService.getRealSpeed();
  }

  getAverageAccuracyLast(): number {
    return this.userService.getAccuracy(this.lastNum);
  }

  getRealAverageAccuracyLast(): number {
    return this.userService.getRealAccuracy(this.lastNum);
  }

  getAverageAccuracyAll(): number {
    return this.userService.getAccuracy();
  }

  getRealAverageAccuracyAll(): number {
    return this.userService.getRealAccuracy();
  }

  getTypingResults() {
    return this.userService.getTypingResults().reverse();
  }

}
