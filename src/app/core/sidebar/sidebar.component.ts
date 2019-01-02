import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { TypingService } from '../services/typing.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private typingService: TypingService,
              private router: Router) { }

  ngOnInit() {
  }

  onPractice() {
    if (this.router.url === '/practice') {
      this.typingService.typingAgain.next();
    }
    this.router.navigate(['/practice']);
  }

  getUserName(): string {
    return this.authService.getProfileNickname();
  }

  getUserPicture(): string {
    return this.authService.getProfilePicture();
  }

  getAverageSpeed(): number {
    if (localStorage.getItem('typingResults')) {
      const typingResults = JSON.parse(localStorage.getItem('typingResults'));
      let speedSum = 0;
      for (let typingResult of typingResults) {
        speedSum += typingResult.speed;
      }
      return Math.round(speedSum / typingResults.length);
    }
    return 0;
  }

  getAverageAccuracy(): number {
    if (localStorage.getItem('typingResults')) {
      const typingResults = JSON.parse(localStorage.getItem('typingResults'));
      let accuracySum = 0;
      for (let typingResult of typingResults) {
        accuracySum += typingResult.accuracy;
      }
      return Math.round(accuracySum / typingResults.length * 100) / 100;
    }
    return 0;
  }

  getTypingTimes(): number {
    if (localStorage.getItem('typingResults')) {
      return JSON.parse(localStorage.getItem('typingResults')).length;
    }
    return 0;
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
