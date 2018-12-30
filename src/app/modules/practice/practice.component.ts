import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TypingService } from '../../shared/services/typing.service';

import { TypingInfo } from '../../shared/models/typing-info.model';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.sass'],
  providers: [
    TypingService
  ]
})
export class PracticeComponent implements OnInit, OnDestroy {

  private typingInfoFetched: Subscription;
  typingInfo: TypingInfo;

  private practiceFinished: Subscription;
  private finished = false;

  private typingAgain: Subscription;

  constructor(private typingService: TypingService) { }

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

  isPracticeFinished(): boolean {
    return this.finished;
  }

}
