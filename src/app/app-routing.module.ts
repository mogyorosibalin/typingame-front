import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './modules/practice/practice.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';
import { AdminComponent } from './modules/admin/admin.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ProductDetailComponent } from './modules/admin/product-detail/product-detail.component';
import { ProductEditComponent } from './modules/admin/product-edit/product-edit.component';
import { TestsComponent } from './modules/tests/tests.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'practice', component: PracticeComponent, runGuardsAndResolvers: 'always' },
  { path: 'tests', component: TestsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'styles', component: StylesComponent },
  { path: 'admin/products', component: AdminComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
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
