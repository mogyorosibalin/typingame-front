import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import { TypingService } from '../../core/services/typing.service';

import { TypingInfo } from '../../shared/models/typing-info.model';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.sass']
})
export class PracticeComponent implements OnInit, OnDestroy {

  private typingInfoFetched: Subscription;
  typingInfo: TypingInfo;

  private practiceFinished: Subscription;
  private finished = false;

  private typingAgain: Subscription;

  constructor(private typingService: TypingService,
              private authService: AuthService) { }

  ngOnInit() {
    this.typingService.fetchTypingInfo();
    this.typingInfoFetched = this.typingService.typingInfoFetched
      .subscribe(
        (typingInfo: TypingInfo) => {
          this.typingInfo = typingInfo;
        }
      );
    this.practiceFinished = this.typingService.typingFinished
      .subscribe(
        () => {
          this.finished = true;
          this.typingService.updateTextAfterPracticeFinished();
        }
      );
    this.typingAgain = this.typingService.typingAgain
      .subscribe(
        () => {
          this.typingInfo = null;
          this.finished = false;
          this.typingService.fetchTypingInfo();
        }
      );
  }

  ngOnDestroy() {
    this.practiceFinished.unsubscribe();
    this.typingInfoFetched.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isPracticeFinished(): boolean {
    return this.finished;
  }

}
