import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const adminRoutes: Routes = [
  { path: 'admin/products', component: AdminComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
