import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TypingInfo } from '../models/typing-info.model';

@Injectable()
export class TypingInfoService {

  private typingInfos: TypingInfo[] = [];
  typingInfosChanged = new Subject<TypingInfo[]>();

  constructor(private httpClient: HttpClient) { }

  getTypingInfosByProductId(productId: number): TypingInfo[] {
    const typingInfos: TypingInfo[] = [];
    if (this.typingInfos) {
      for (let typingInfo of this.typingInfos) {
        if (typingInfo.product.id === productId) {
          typingInfos.push(typingInfo);
        }
      }
    }
    return typingInfos;
  }

  fetchTypingInfosForProduct(productId: number) {
    this.httpClient.get('http://localhost:8080/products/' + productId + '/texts')
      .subscribe(
        (typingInfos: TypingInfo[]) => {
          this.typingInfos.push(...typingInfos);
          this.typingInfosChanged.next(this.getTypingInfosByProductId(productId));
        }
      );
  }
}
