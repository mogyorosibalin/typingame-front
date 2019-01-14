import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ProductType } from '../models/product-type.model';

@Injectable()
export class ProductTypeService {

  private productTypes: ProductType[];
  productTypesChanged = new Subject<ProductType[]>();

  constructor(private httpClient: HttpClient) { }

  fetchProductTypes() {
    this.httpClient.get<ProductType[]>('http://localhost:8080/product-types')
      .subscribe(
        (productTypes: ProductType[]) => {
          this.productTypes = productTypes;
          this.productTypesChanged.next(this.productTypes.slice());
        }
      );
  }

  getProductTypes() {
    return this.productTypes;
  }

}
