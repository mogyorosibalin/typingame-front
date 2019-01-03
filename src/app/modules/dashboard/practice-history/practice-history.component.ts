import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-practice-history',
  templateUrl: './practice-history.component.html',
  styleUrls: ['./practice-history.component.sass']
})
export class PracticeHistoryComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getTypingResults(): any[] {
    return this.userService.getTypingResults();
  }

}
