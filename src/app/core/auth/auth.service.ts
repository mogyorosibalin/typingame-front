import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'F2byYHTuDPDD2XN9BqMcpx4A0ptvMw4I',
    domain: 'typingame.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/loading',
    scope: 'openid'
  });

  constructor() { }

}
