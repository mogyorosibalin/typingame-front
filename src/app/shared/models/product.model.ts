import { ProductType } from './product-type.model';

export class Product {
  id: number;
  name: string;
  author: string;
  url: string;
  productType: ProductType;
}
