import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import { TypingService } from '../../core/services/typing.service';

import { Text } from '../../shared/models/text.model';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.sass']
})
export class PracticeComponent implements OnInit, OnDestroy {

  private textFetched: Subscription;
  text: Text;

  private practiceFinished: Subscription;
  private finished = false;

  private typingAgain: Subscription;

  constructor(private typingService: TypingService,
              private authService: AuthService) { }

  ngOnInit() {
    this.typingService.fetchText();
    this.textFetched = this.typingService.textFetched
      .subscribe(
        (text: Text) => {
          this.text = text;
        }
      );
    this.practiceFinished = this.typingService.typingFinished
      .subscribe(
        () => {
          this.finished = true;
        }
      );
    this.typingAgain = this.typingService.typingAgain
      .subscribe(
        () => {
          this.text = null;
          this.finished = false;
          this.typingService.fetchText();
        }
      );
  }

  ngOnDestroy() {
    this.practiceFinished.unsubscribe();
    this.textFetched.unsubscribe();
    this.typingAgain.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isPracticeFinished(): boolean {
    return this.finished;
  }

}
