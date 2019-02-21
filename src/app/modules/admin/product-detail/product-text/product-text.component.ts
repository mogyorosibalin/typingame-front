import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { TextService } from '../../../../shared/services/text.service';

import { Text } from '../../../../shared/models/text.model';

@Component({
  selector: 'app-product-text',
  templateUrl: './product-text.component.html',
  styleUrls: ['./product-text.component.sass']
})
export class ProductTextComponent implements OnInit {

  @Input() text: Text;
  @Input() isNewText = false;
  @Input() productId: number;

  @Output('cancelNewText') cancelNewText = new EventEmitter();

  @ViewChild('textContainer') textContainer: ElementRef;

  private editing = false;

  constructor(private textService: TextService) { }

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

  onDelete() {
    if (confirm('Are you sure you want to delete this text: ' + this.text.text + '?')) {
      this.textService.deleteText(this.text._id);
    }
  }

  onSave() {
    if (this.isNewText) {
      // Save New
      this.textService.addText(this.productId, this.textContainer.nativeElement.value);
      this.cancelNewText.emit();
    } else {
      // Update current
      this.textService.updateText(this.text._id, this.textContainer.nativeElement.value);
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
