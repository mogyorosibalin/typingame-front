import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTextComponent } from './product-detail/product-text/product-text.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductDetailComponent,
    ProductTextComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
