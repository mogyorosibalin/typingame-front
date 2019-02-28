import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SpeedChartModule } from '../speed-chart/speed-chart.module';

import { DashboardComponent } from './dashboard.component';
import { PracticeHistoryComponent } from './practice-history/practice-history.component';
import { TypingResultComponent } from './practice-history/typing-result/typing-result.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PracticeHistoryComponent,
    TypingResultComponent,
    ProfileComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    SpeedChartModule
  ],
  exports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
