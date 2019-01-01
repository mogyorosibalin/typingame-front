import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { TypingInfo } from '../models/typing-info.model';

@Injectable()
export class TypingService {

  private renderer: Renderer2;

  typingInfoFetched = new Subject<TypingInfo>();
  typingFinished = new Subject();
  typingAgain = new Subject();

  private typingContainer: ElementRef;
  private textContainer: ElementRef;
  private text: string;

  private interval;

  private currentChar;
  private nextChar;
  private startTime: Date;
  private finishTime: Date;

  private textIndex: number;
  private textWasGoodArray: boolean[];

  private error: boolean;
  private going: boolean;
  private finished: boolean;

  constructor(private httpClient: HttpClient) { }
  fetchTypingInfo() {
    return this.httpClient.get<TypingInfo>('http://localhost:8080/texts/random')
      .subscribe(
        (typingInfo: TypingInfo) => {
          this.typingInfoFetched.next(typingInfo);
        }
      );
  }

  setRenderer(renderer: Renderer2) {
    this.renderer = renderer;
  }

  resetTypingService() {
    this.textIndex = 0;
    this.textWasGoodArray = [];

    this.error = false;
    this.going = false;
    this.finished = false;
  }

  initTypingService(typingContainer: ElementRef, textContainer: ElementRef, practiceText: string) {
    this.resetTypingService();

    this.typingContainer = typingContainer;
    this.textContainer = textContainer;
    this.text = practiceText;

    this.setUpTextWasGoodArray();

    this.loadTextToDom();
  }

  loadTextToDom(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.addChildToParent(
        this.textContainer.nativeElement,
        this.text[i] === ' ' ? 'pre' : 'span',
        this.text[i],
        i === 0 ? 'active' : '');
    }
    this.addChildToParent(this.textContainer.nativeElement, 'span', '');
  }

  private addChildToParent(parent: any, childType: string, childText: string, childClass = '') {
    const childElement = this.renderer.createElement(childType);
    this.renderer.appendChild(childElement, this.renderer.createText(childText));
    if (childClass !== '') {
      this.renderer.addClass(childElement, childClass);
    }
    this.renderer.appendChild(parent, childElement);
  }

  keyWasDown(event: any) {
    this.currentChar = this.typingContainer.nativeElement.querySelector('.active');

    if (!this.isValidPress(event)) {
      event.preventDefault();
    }

    if (this.isBackspacePressed(event)) {
      this.nextChar = this.currentChar.previousElementSibling;
      if (this.nextChar) {
        this.resetChar(this.nextChar);
      } else {
        this.nextChar = this.currentChar;
      }
      if (this.typingContainer.nativeElement.querySelectorAll('.wrong').length === 0) {
        this.error = false;
      }
      this.charWasPressed();
      this.textIndex = Math.max(--this.textIndex, 0);
    }

    if (this.isCharPressed(event)) {
      if (!this.isStarted()) {
        this.going = true;
        this.startTime = new Date();
        this.interval = setInterval(() => {
          this.updateStatistics();
        }, 1500);
      }
      if (this.isGoing()) {
        if (this.isGoodPress(event)) {
          this.renderer.addClass(this.currentChar, 'correct');
        } else {
          this.renderer.addClass(this.currentChar, 'wrong');
          if (!this.isError()) {
            this.textWasGoodArray[this.textIndex] = false;
          }
          this.error = true;
        }
        if (this.currentChar.nextElementSibling) {
          this.nextChar = this.currentChar.nextElementSibling;
        } else {
          this.nextChar = this.currentChar;
          this.nextChar.classList.remove('wrong');
        }
        this.charWasPressed();
      }
      this.textIndex = Math.min(++this.textIndex, this.text.length - 1);
      if (this.isCompleted()) {
        this.wasCompleted();
      }
    }
  }

  private isValidPress(event): boolean {
    return event.keyCode !== 9 &&
      (this.notModifierKey(event) || event.key === 'r' || !isNaN(event.key));
  }

  private notModifierKey(event: any): boolean {
    return !event.metaKey && !event.ctrlKey;
  }

  private isBackspacePressed(event: any): boolean {
    return event.keyCode === 8 && this.going;
  }

  private isCharPressed(event): boolean {
    return event.key.length === 1 && this.notModifierKey(event);
  }

  private isStarted(): boolean {
    return !(!this.going && !this.finished);
  }

  private setUpTextWasGoodArray() {
    for (let i = 0; i < this.text.length; i++) {
      this.textWasGoodArray.push(true);
    }
  }

  private updateStatistics() {
    this.renderer.setProperty(this.typingContainer.nativeElement.querySelector('#speed'), 'innerHTML',
      this.finished ? this.getFinalSpeed() : this.getSpeed());
    this.renderer.setStyle(
      this.typingContainer.nativeElement.querySelector('#progressionContainer .progression-bar'),
      'width',
      this.getProgression() + '%'
    );
  }

  private getSpeed(): number {
    return Math.round(
      (this.typingContainer.nativeElement.querySelectorAll('#textContainer .correct').length / 5) / (this.getPastTime() / 60));
  }

  private getPastTime() {
    return Math.round((<any>new Date() - <any>this.startTime) / 1000);
  }

  private getProgression() {
    return Math.round(this.typingContainer.nativeElement.querySelectorAll('#textContainer .correct').length / this.text.length * 100);
  }

  private isGoing(): boolean {
    return this.going;
  }

  isError(): boolean {
    return this.error;
  }

  private isGoodPress(event: any): boolean {
    return event.key === this.currentChar.innerHTML && !this.isError();
  }

  private isCompleted(): boolean {
    return !this.isError() &&
      this.typingContainer.nativeElement.querySelectorAll('.correct').length === this.text.length;
  }

  private wasCompleted() {
    clearInterval(this.interval);
    this.going = false;
    this.finished = true;
    this.finishTime = new Date();
    this.updateStatistics();
    this.renderer.removeClass(this.typingContainer.nativeElement.querySelector('.active'), 'active');
    this.typingFinished.next();
  }

  private charWasPressed() {
    this.renderer.removeClass(this.currentChar, 'active');
    if (this.nextChar) {
      this.renderer.addClass(this.nextChar, 'active');
    }
  }

  private resetChar(element: any) {
    this.renderer.removeClass(element, 'active');
    this.renderer.removeClass(element, 'correct');
    this.renderer.removeClass(element, 'wrong');
  }

  getAccuracy() {
    return Math.round((this.textWasGoodArray.filter(good => good).length / this.textWasGoodArray.length) * 100 * 100) / 100;
  }

  getElapsedTime() {
    return <any>this.finishTime - <any>this.startTime;
  }

  getFinalSpeed() {
    return Math.round((this.text.length / 5) / (this.getElapsedTime() / 1000 / 60));
  }

}
