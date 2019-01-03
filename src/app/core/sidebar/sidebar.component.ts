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
    }
    this.router.navigate(['/practice']);
  }

  getUserName(): string {
    return this.userService.getNickname();
  }

  getUserPicture(): string {
    return this.userService.getProfilePicture();
  }

  getAverageSpeed(): number {
    return this.userService.getAverageSpeed();
  }

  getAverageAccuracy(): number {
    return this.userService.getAverageAccuracy();
  }

  getTypingTimes(): number {
    return this.userService.getTypingTimes();
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
