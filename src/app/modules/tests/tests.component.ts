import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TestTextService } from '../../shared/services/test-text.service';

import { TestText } from '../../shared/models/test-text.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.sass']
})
export class TestsComponent implements OnInit, OnDestroy {

  private testTexts: TestText[];
  private testTextsChangedSubscription: Subscription;

  constructor(private testTextService: TestTextService) { }

  ngOnInit() {
    this.testTextService.fetchTestTexts();
    this.testTextsChangedSubscription = this.testTextService.testTextsChanged
      .subscribe(
        (testTexts: TestText[]) => {
          this.testTexts = testTexts;
        }
      );
  }

  ngOnDestroy() {
    this.testTextsChangedSubscription.unsubscribe();
  }

  getTestTexts(): TestText[] {
    return this.testTexts;
  }

}
