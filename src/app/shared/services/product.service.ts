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
          this.setProducts(products);
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

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  addProduct(formValue: any) {
    this.httpClient.post('http://localhost:8080/products/new', formValue)
      .subscribe(
        (products: Product[]) => {
          this.setProducts(products);
        }
      );
  }

  updateProduct(productId: number, formValue: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === productId) {
        this.products[i].name = formValue.name;
        this.products[i].author = formValue.author;
        this.products[i].productType.type = formValue.type;
        break;
      }
    }
    this.httpClient.put('http://localhost:8080/products/' + productId + '/edit', formValue)
      .subscribe(
        (products: Product[]) => {
          this.setProducts(products);
        }
      );
  }
}
