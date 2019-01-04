import { Component, OnInit } from '@angular/core';
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
export class ProductDetailComponent implements OnInit {

  productId: number;
  private product: Product;
  private typingInfos: TypingInfo[];
  private typingInfosChangedSubscription: Subscription;

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
          if (!this.product) {
            this.router.navigate(['/admin']);
          }
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
  }

  getProduct(): Product {
    return this.product;
  }

  getTypingInfos(): TypingInfo[] {
    return this.typingInfos;
  }

}
