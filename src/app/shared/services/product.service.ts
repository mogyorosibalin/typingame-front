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
    this.httpClient.get<Product[]>('http://localhost:3000/products')
      .subscribe(
        (products: Product[]) => {
          this.setProducts(products);
        }
      );
  }

  getProduct(_id: number) {
    if (this.products) {
      for (const product of this.products) {
        if (product._id === _id) {
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
    this.httpClient.post('http://localhost:3000/products', formValue)
      .subscribe(
        (products: Product[]) => {
          this.setProducts(products);
        }
      );
  }

  updateProduct(_id: number, formValue: any) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === _id) {
        this.products[i].name = formValue.name;
        this.products[i].author = formValue.author;
        this.products[i].productType.name = formValue.name;
        break;
      }
    }
    this.httpClient.put('http://localhost:8080/products/' + _id + '/edit', formValue)
      .subscribe(
        (products: Product[]) => {
          this.setProducts(products);
        }
      );
  }

  deleteProduct(_id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === _id) {
        this.products.splice(i, 1);
        this.productsChanged.next(this.products.slice());
        break;
      }
    }
    this.httpClient.delete('http://localhost:8080/products/' + _id + '/delete').subscribe();
  }
}
