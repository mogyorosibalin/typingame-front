import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TextService } from '../../../shared/services/text.service';
import { ProductService } from '../../../shared/services/product.service';

import { Text } from '../../../shared/models/text.model';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number;
  private product: Product;
  private productsChangedSubscription: Subscription;
  private texts: Text[];
  private textsChangedSubscription: Subscription;

  private newText = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private typingInfoService: TextService,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.productId = +params['id'];
          this.product = this.productService.getProduct(this.productId);
          this.texts = this.typingInfoService.getTextsByProductId(this.productId);
          if (this.texts.length === 0) {
            this.typingInfoService.fetchTextsForProduct(this.productId);
          }
        }
      );
    this.textsChangedSubscription = this.typingInfoService.textsChanged
      .subscribe(
        (texts: Text[]) => {
          this.texts = texts;
        }
      );
    this.productsChangedSubscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.product = this.productService.getProduct(this.productId);
          if (!this.product) {
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        }
      );
  }

  ngOnDestroy() {
    this.textsChangedSubscription.unsubscribe();
    this.productsChangedSubscription.unsubscribe();
  }

  getProduct(): Product {
    return this.product;
  }

  getTexts(): Text[] {
    return this.texts;
  }

  isNewText(): boolean {
    return this.newText;
  }

  onNewText() {
    this.newText = true;
  }

  onCancelNewText() {
    this.newText = false;
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this product: ' + this.product.name + '?')) {
      this.typingInfoService.deleteTextsForProduct(this.product.id);
      this.productService.deleteProduct(this.product.id);
    }
  }

}
