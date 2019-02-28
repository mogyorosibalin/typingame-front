import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeedChartModule } from '../speed-chart/speed-chart.module';

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
    CommonModule,
    SpeedChartModule
  ]
})
export class PracticeModule {}
