import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../../../shared/services/product.service';

import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  private productsChangedSubscription: Subscription;
  private products: Product[];

  filterText: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.fetchProducts();
    this.productsChangedSubscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
  }

  getProducts(): Product[] {
    return this.products;
  }

}
