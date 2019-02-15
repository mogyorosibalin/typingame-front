import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PracticeHistoryComponent } from './practice-history/practice-history.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { AuthGuard } from '../../core/guards/auth-guard.service';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent },
      { path: 'practice-history', component: PracticeHistoryComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
