import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeComponent } from './practice.component';
import { PracticeTypingComponent } from './practice-typing/practice-typing.component';
import { PracticeInfoComponent } from './practice-info/practice-info.component';

@NgModule({
  declarations: [
    PracticeComponent,
    PracticeTypingComponent,
    PracticeInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PracticeModule {}
