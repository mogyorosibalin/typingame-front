import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

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

}
