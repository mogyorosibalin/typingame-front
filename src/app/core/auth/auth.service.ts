import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'F2byYHTuDPDD2XN9BqMcpx4A0ptvMw4I',
    domain: 'typingame.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/loading',
    scope: 'openid profile'
  });

  constructor(public router: Router,
              private httpClient: HttpClient,
              private userService: UserService) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get idToken(): string {
    return this._idToken;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.getUserStatistics();
        this.router.navigate(['/practice']);
      } else if (err) {
        this.router.navigate(['/practice']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.removeItem('typingResults');
    this.userService.setProfile(authResult.idTokenPayload);
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  renewTokens(): void {
    console.log('renewing tokens');
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    this.userService.setTypingResults(null);
    this.userService.setProfile(null);
    // Go back to the home route
    this.router.navigate(['/about']);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

  getUserStatistics() {
    this.httpClient.get('http://localhost:8080/typing-results/' + this.userService.getHash())
      .subscribe(
        (typingResults: any) => {
          this.userService.setTypingResults(typingResults);
        }
      );
  }

}
