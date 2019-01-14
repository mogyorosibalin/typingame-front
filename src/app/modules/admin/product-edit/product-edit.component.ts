import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService } from '../../../shared/services/product.service';
import { ProductTypeService } from '../../../shared/services/product-type.service';

import { Product } from '../../../shared/models/product.model';
import { ProductType } from '../../../shared/models/product-type.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  private productTypesChangedSubscription: Subscription;
  private productTypes: ProductType[];

  private productId;
  product: Product;

  productForm: FormGroup;

  constructor(private productService: ProductService,
              private productTypeService: ProductTypeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.productTypeService.fetchProductTypes();
    this.productTypesChangedSubscription = this.productTypeService.productTypesChanged
      .subscribe(
        (productTypes: ProductType[]) => {
          this.productTypes = productTypes;
        }
      );
    this.route.params
      .subscribe(
        (params: Params) => {
          this.productId = +params['id'];
          this.initForm();
        }
      );
  }

  ngOnDestroy() {
    this.productTypesChangedSubscription.unsubscribe();
  }

  getProductTypes() {
    return this.productTypes;
  }

  initForm() {
    let productName = '';
    let productAuthor = '';
    let productType = '';

    if (this.isEditMode()) {
      const product = this.productService.getProduct(this.productId);
      if (!product) {
        this.router.navigate(['../'], { relativeTo: this.route });
      } else {
        productName = product.name;
        productAuthor = product.author;
        productType = product.productType.type;
      }
    }

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'author': new FormControl(productAuthor, Validators.required),
      'type': new FormControl(productType, Validators.required)
    });
  }

  isEditMode(): boolean {
    return !!this.productId;
  }

  onSubmit() {
    if (this.isEditMode()) {
      this.productService.updateProduct(this.productId, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
