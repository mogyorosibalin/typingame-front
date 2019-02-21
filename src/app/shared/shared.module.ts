import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './components/loading/loading.component';

import { InputFilledDirective } from './directives/input-fields.directive';
import { OpenedDirective } from './directives/opened.directive';

import { FilterPipe } from './pipes/filter.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/product-type.service';
import { TestTextService } from './services/test-text.service';
import { TextService } from './services/text.service';

@NgModule({
  declarations: [
    LoadingComponent,
    InputFilledDirective,
    OpenedDirective,
    FilterPipe,
    ReversePipe,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    InputFilledDirective,
    OpenedDirective,
    FilterPipe,
    ReversePipe,
    ShortenPipe
  ],
  providers: [
    ProductService,
    ProductTypeService,
    TestTextService,
    TextService
  ]
})
export class SharedModule { }
