import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TypingInfoService } from '../../../shared/services/typing-info.service';
import { ProductService } from '../../../shared/services/product.service';

import { TypingInfo } from '../../../shared/models/typing-info.model';
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
  private typingInfos: TypingInfo[];
  private typingInfosChangedSubscription: Subscription;

  private newText = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private typingInfoService: TypingInfoService,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.productId = +params['id'];
          this.product = this.productService.getProduct(this.productId);
          this.typingInfos = this.typingInfoService.getTypingInfosByProductId(this.productId);
          if (this.typingInfos.length === 0) {
            this.typingInfoService.fetchTypingInfosForProduct(this.productId);
          }
        }
      );
    this.typingInfosChangedSubscription = this.typingInfoService.typingInfosChanged
      .subscribe(
        (typingInfos: TypingInfo[]) => {
          this.typingInfos = typingInfos;
        }
      );
    this.productsChangedSubscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.product = this.productService.getProduct(this.productId);
        }
      );
  }

  ngOnDestroy() {
    this.typingInfosChangedSubscription.unsubscribe();
    this.productsChangedSubscription.unsubscribe();
  }

  getProduct(): Product {
    return this.product;
  }

  getTypingInfos(): TypingInfo[] {
    return this.typingInfos;
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

}
