import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { AuthService } from '../../../core/auth/auth.service';
import { TypingService } from '../../../core/services/typing.service';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-practice-typing',
  templateUrl: './practice-typing.component.html',
  styleUrls: ['./practice-typing.component.sass']
})
export class PracticeTypingComponent implements OnInit {

  @Input() private practiceText: string;
  @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('typingContainer') typingContainer: ElementRef;

  @HostListener('document:keydown', ['$event']) keyPress(event: KeyboardEvent) {
    this.typingService.keyWasDown(event);
  }

  constructor(private typingService: TypingService,
              private renderer: Renderer2,
              private authService: AuthService,
              private userService: UserService) {
    this.typingService.setRenderer(this.renderer);
  }

  ngOnInit() {
    this.typingService.initTypingService(this.typingContainer, this.textContainer, this.practiceText);
  }

  isError(): boolean {
    return this.typingService.isError();
  }

  getUserPicture(): string {
    return this.userService.getProfilePicture();
  }

}
