import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Product[], filterText: string, inWhat: any) {
    if (!items) { return []; }
    if (!filterText) { return items; }

    return items.filter(item => {
      return item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.productType.type.toLowerCase().includes(filterText.toLowerCase());
    });
  }

}
