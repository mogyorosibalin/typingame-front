import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  private products: Product[];
  productsChanged = new Subject<Product[]>();

  constructor(private httpClient: HttpClient) { }

  fetchProducts() {
    this.httpClient.get<Product[]>('http://localhost:8080/products')
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          this.productsChanged.next(this.products.slice());
        }
      );
  }

  getProduct(productId: number) {
    if (this.products) {
      for (let product of this.products) {
        if (product.id === productId) {
          return product;
        }
      }
    }
    return null;
  }
}
