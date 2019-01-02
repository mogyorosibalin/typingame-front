import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem('typingResults') !== null) {
      localStorage.removeItem('typingResults');
    }
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.authService.renewTokens();
    }
  }

  setRoutedComponent(componentRef: Component) {
    // console.log(componentRef);
  }

}
