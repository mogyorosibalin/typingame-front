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

  addTypingInfo(productId: number, text: string) {
    this.httpClient.post('http://localhost:8080/texts/new', {
      productId: productId,
      text: text
    }).subscribe(
      (typingInfo: TypingInfo) => {
        this.typingInfos.push(typingInfo);
        this.typingInfosChanged.next(this.getTypingInfosByProductId(productId));
      }
    );
  }

  updateTypingInfo(id: number, text: string) {
    for (let i = 0; i < this.typingInfos.length; i++) {
      if (this.typingInfos[i].id === id) {
        this.typingInfos[i].text = text;
        break;
      }
    }
    this.httpClient.put('http://localhost:8080/texts/' + id + '/edit', {
      text: text
    }).subscribe(
      (typingInfo: TypingInfo) => {
        // Nothing
      }
    );
  }

}
