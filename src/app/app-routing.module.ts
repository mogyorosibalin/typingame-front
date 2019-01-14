import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './modules/practice/practice.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';
import { AdminComponent } from './modules/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/dashboard/profile/profile.component';
import { PracticeHistoryComponent } from './modules/dashboard/practice-history/practice-history.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { StatisticsComponent } from './modules/dashboard/statistics/statistics.component';
import { ProductDetailComponent } from './modules/admin/product-detail/product-detail.component';
import { ProductEditComponent } from './modules/admin/product-edit/product-edit.component';

import { AuthGuard } from './core/guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'practice', component: PracticeComponent, runGuardsAndResolvers: 'always' },
  { path: 'about', component: AboutComponent },
  { path: 'styles', component: StylesComponent },
  { path: 'admin/products', component: AdminComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  },
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
  },
  { path: 'loading', component: LoadingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
