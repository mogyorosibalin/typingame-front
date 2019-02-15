import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TestText } from '../models/test-text.model';

@Injectable()
export class TestTextService {

  private testTexts: TestText[];
  testTextsChanged = new Subject<TestText[]>();

  constructor(private httpClient: HttpClient) { }

  fetchTestTexts() {
    this.httpClient.get<TestText[]>('http://localhost:8080/test-texts')
      .subscribe(
        (testTexts: TestText[]) => {
          this.setTestTexts(testTexts);
        }
      );
  }

  setTestTexts(testTexts: TestText[]) {
    this.testTexts = testTexts;
    this.testTextsChanged.next(this.testTexts.slice());
  }

}
