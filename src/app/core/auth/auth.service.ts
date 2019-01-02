import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  private authProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'F2byYHTuDPDD2XN9BqMcpx4A0ptvMw4I',
    domain: 'typingame.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/loading',
    scope: 'openid profile'
  });

  constructor(public router: Router) {
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
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this.authProfile = authResult.idTokenPayload;
    console.log(this.authProfile);
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
    // Go back to the home route
    this.router.navigate(['/about']);
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

  getUserHash(): string {
    if (this.isAuthenticated()) {
      return this.authProfile.sub;
    }
    return null;
  }

  getProfileNickname(): string {
    if (this.isAuthenticated()) {
      return this.authProfile.nickname;
    }
    return 'guest';
  }

  getProfilePicture(): string {
    if (this.isAuthenticated()) {
      return this.authProfile.picture;
    }
    return 'http://www.promaxindia.tv/wp-content/uploads/2017/03/no_image_user.png';
  }

}
