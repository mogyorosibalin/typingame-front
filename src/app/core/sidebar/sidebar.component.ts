import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { TypingService } from '../services/typing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private typingService: TypingService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onPractice() {
    if (this.router.url === '/practice') {
      this.typingService.typingAgain.next();
    } else {
      this.router.navigate(['/practice']);
    }
  }

  getUserName(): string {
    return this.userService.getNickname();
  }

  getUserPicture(): string {
    return this.userService.getProfilePicture();
  }

  getAverageSpeed(): number {
    return this.userService.getSpeed();
  }

  getAverageAccuracy(): number {
    return this.userService.getAccuracy();
  }

  getTypingTimes(): number {
    return this.userService.getTypingTimes();
  }

  getPoints(): number {
    return this.userService.getPoints();
  }

  getAverageSpeedLast(lastNum: number = 10) {
    return this.userService.getSpeed(lastNum);
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
