import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Text } from '../models/text.model';

@Injectable()
export class TextService {

  private texts: Text[] = [];
  textsChanged = new Subject<Text[]>();

  constructor(private httpClient: HttpClient) { }

  getTextsByProductId(productId: number): Text[] {
    const texts: Text[] = [];
    if (this.texts) {
      for (const text of this.texts) {
        if (text.product.id === productId) {
          texts.push(text);
        }
      }
    }
    return texts;
  }

  fetchTextsForProduct(productId: number) {
    this.httpClient.get('http://localhost:8080/products/' + productId + '/texts')
      .subscribe(
        (texts: Text[]) => {
          this.texts.push(...texts);
          this.textsChanged.next(this.getTextsByProductId(productId));
        }
      );
  }

  addText(productId: number, textString: string) {
    this.httpClient.post('http://localhost:8080/texts', {
      productId: productId,
      text: textString
    }).subscribe(
      (text: Text) => {
        this.texts.push(text);
        this.textsChanged.next(this.getTextsByProductId(productId));
      }
    );
  }

  updateText(_id: number, textString: string) {
    for (let i = 0; i < this.texts.length; i++) {
      if (this.texts[i]._id === _id) {
        this.texts[i].text = textString;
        break;
      }
    }
    this.httpClient.put('http://localhost:8080/texts/' + _id + '/edit', {
      text: textString
    }).subscribe(
      (text: Text) => {
        // Nothing
      }
    );
  }

  deleteText(_id: number) {
    for (let i = 0; i < this.texts.length; i++) {
      if (this.texts[i]._id === _id) {
        const productId = this.texts[i].product.id;
        this.texts.splice(i, 1);
        this.textsChanged.next(this.getTextsByProductId(productId));
        break;
      }
    }
    this.httpClient.delete('http://localhost:8080/texts/' + _id + '/delete').subscribe();
  }

  deleteTextsForProduct(productId: number) {
    for (let i = this.texts.length - 1; i >= 0; i--) {
      if (this.texts[i].product.id === productId) {
        this.texts.splice(i, 1);
      }
    }
  }

}
