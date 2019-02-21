import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

import { Text } from '../../shared/models/text.model';

import { CharFeedback } from '../../shared/enums/char-feedback.enum';

@Injectable()
export class TypingService {

  private renderer: Renderer2;

  textFetched = new Subject<Text>();
  typingFinished = new Subject();
  typingAgain = new Subject();

  private text: Text;

  private typingContainer: ElementRef;
  private textContainer: ElementRef;
  private textString: string;

  private interval;

  private currentChar;
  private nextChar;
  private startTime: Date;
  private finishTime: Date;

  private textIndex: number;
  private textWasGoodArray: CharFeedback[];

  private error: boolean;
  private going: boolean;
  private finished: boolean;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService) { }

  fetchText() {
    return this.httpClient.get<Text>('http://localhost:3000/texts/random')
      .subscribe(
        (text) => {
          this.text = text;
          this.textFetched.next(this.text);
        }
      );
  }

  getText(): Text {
    return this.text;
  }

  setRenderer(renderer: Renderer2) {
    this.renderer = renderer;
  }

  resetTypingService() {
    clearInterval(this.interval);

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
    this.textString = practiceText;

    this.setUpTextWasGoodArray();

    this.loadTextToDom(this.textString, this.textContainer);
  }

  loadTextToDom(text: string, textContainer: ElementRef): void {
    for (let i = 0; i < text.length; i++) {
      this.addChildToParent(
        textContainer.nativeElement,
        'span',
        text[i],
        i === 0 ? 'active' : '');
    }
    this.addChildToParent(textContainer.nativeElement, 'span', '');
  }

  private addChildToParent(parent: any, childType: string, childText: string, childClass = '') {
    const childElement = this.renderer.createElement(childType);
    this.renderer.appendChild(childElement, this.renderer.createText(childText));
    if (childClass !== '') {
      this.renderer.addClass(childElement, childClass);
    }
    this.renderer.appendChild(parent, childElement);
  }

  updateTextAfterPracticeFinished(typingContainer: ElementRef, textWasGoodArray: CharFeedback[]): void {
    const chars = typingContainer.nativeElement.querySelectorAll('.correct');
    for (let i = 0; i < textWasGoodArray.length; i++) {
      if (textWasGoodArray[i] !== CharFeedback.CORRECT) {
        this.renderer.removeClass(chars[i], 'correct');
        if (textWasGoodArray[i] === CharFeedback.WRONG) {
          this.renderer.addClass(chars[i], 'wrong-after');
        } else if (textWasGoodArray[i] === CharFeedback.UNPRODUCTIVE) {
          this.renderer.addClass(chars[i], 'unproductive');
        }
      }
    }
  }

  keyWasDown(event: any) {
    this.currentChar = this.typingContainer.nativeElement.querySelector('.active');

    if (!this.isValidPress(event)) {
      event.preventDefault();
    }

    if (this.isBackspacePressed(event)) {
      event.preventDefault();
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
          if (this.isError()) {
            if (this.textWasGoodArray[this.textIndex] === CharFeedback.CORRECT) {
              this.textWasGoodArray[this.textIndex] = CharFeedback.UNPRODUCTIVE;
            }
          } else {
            this.textWasGoodArray[this.textIndex] = CharFeedback.WRONG;
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
      this.textIndex = Math.min(++this.textIndex, this.textString.length - 1);
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
    for (let i = 0; i < this.textString.length; i++) {
      this.textWasGoodArray.push(CharFeedback.CORRECT);
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
    return Math.round(this.typingContainer.nativeElement.querySelectorAll('#textContainer .correct').length / this.textString.length * 100);
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
      this.typingContainer.nativeElement.querySelectorAll('.correct').length === this.textString.length;
  }

  private wasCompleted() {
    clearInterval(this.interval);
    this.going = false;
    this.finished = true;
    this.finishTime = new Date();
    this.updateStatistics();
    this.renderer.removeClass(this.typingContainer.nativeElement.querySelector('.active'), 'active');
    if (this.authService.isAuthenticated()) {
      this.saveResultOnline();
    } else {
      this.saveResultOffline();
    }
    this.updateTextAfterPracticeFinished(this.typingContainer, this.textWasGoodArray);
    this.typingFinished.next();
  }

  private saveResultOnline() {
    this.httpClient.post(
      'http://localhost:3000/typing-results',
      {
        textId: this.text._id,
        chars: this.textWasGoodArray,
        time: this.getElapsedTime(),
        userHash: this.userService.getHash(),
        points: this.getPoints()
      }
    ).subscribe(
      (typingResults: any) => {
        this.userService.setTypingResults(typingResults);
      }
    );
  }

  private saveResultOffline(): void {
    const result = {
      timeMiliSec: this.getElapsedTime(),
      chars: this.textWasGoodArray
    };
    if (localStorage.getItem('typingResults') === null) {
      localStorage.setItem('typingResults', JSON.stringify([result]));
    } else {
      const results = JSON.parse(localStorage.getItem('typingResults'));
      results.push(result);
      localStorage.setItem('typingResults', JSON.stringify(results));
    }
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
    return Math.round(
      (this.textWasGoodArray.filter(good => good !== CharFeedback.WRONG).length / this.textWasGoodArray.length) * 100 * 100) / 100;
  }

  getElapsedTime() {
    return <any>this.finishTime - <any>this.startTime;
  }

  getFinalSpeed() {
    return Math.round((this.textString.length / 5) / (this.getElapsedTime() / 1000 / 60));
  }

  getPoints() {
    return Math.round((this.textString.length / 2) * (this.getAccuracy() / 100) * (this.getFinalSpeed() / 100));
  }

}
