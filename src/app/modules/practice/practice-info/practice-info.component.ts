import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { TypingService } from '../../../core/services/typing.service';
import { Text } from '../../../shared/models/text.model';

@Component({
  selector: 'app-practice-info',
  templateUrl: './practice-info.component.html',
  styleUrls: ['./practice-info.component.sass']
})
export class PracticeInfoComponent implements OnInit, OnDestroy {

  text: Text;
  typingResults: any[];
  private _typingResultsSub: Subscription;

  constructor(private authService: AuthService,
              private typingService: TypingService) { }

  ngOnInit() {
    this.text = this.typingService.getText();
    this._typingResultsSub = this.typingService.typingResultsForTextChanged
      .subscribe(
        (typingResults: any[]) => {
          this.typingResults = typingResults;
        }
      );
  }

  ngOnDestroy() {
    this._typingResultsSub.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  onPracticeAgain() {
    this.typingService.typingAgain.next();
  }

  getAccuracy() {
   return this.typingService.getAccuracy();
  }

  getElapsedTime() {
    return Math.round(this.typingService.getElapsedTime() / 1000);
  }

  getSpeed() {
    return this.typingService.getFinalSpeed();
  }

  getPoints() {
    return this.typingService.getPoints();
  }

}
