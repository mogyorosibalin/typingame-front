import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
