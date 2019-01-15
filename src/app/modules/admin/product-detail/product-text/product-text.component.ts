import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

import { TypingInfoService } from '../../../../shared/services/typing-info.service';

import { TypingInfo } from '../../../../shared/models/typing-info.model';

@Component({
  selector: 'app-product-text',
  templateUrl: './product-text.component.html',
  styleUrls: ['./product-text.component.sass']
})
export class ProductTextComponent implements OnInit {

  @Input() typingInfo: TypingInfo;
  @Input() isNewText = false;
  @Input() productId: number;

  @Output('cancelNewText') cancelNewText = new EventEmitter();

  @ViewChild('text') text: ElementRef;

  private editing = false;

  constructor(private typingInfoService: TypingInfoService) { }

  ngOnInit() {
    if (this.isNewText) {
      this.editing = true;
    }
  }

  isEditing(): boolean {
    return this.editing;
  }

  onEdit() {
    this.editing = true;
  }

  onSave() {
    if (this.isNewText) {
      // Save New
      this.typingInfoService.addTypingInfo(this.productId, this.text.nativeElement.value);
      this.cancelNewText.emit();
    } else {
      // Update current
      this.typingInfoService.updateTypingInfo(this.typingInfo.id, this.text.nativeElement.value);
      this.onCancel();
    }
  }

  onCancel() {
    if (this.isNewText) {
      // Destroy component
      this.cancelNewText.emit();
    } else {
      this.editing = false;
    }
  }

}
