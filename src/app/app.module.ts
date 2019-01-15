import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PracticeModule } from './modules/practice/practice.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';

import { AuthService } from './core/auth/auth.service';
import { TypingService } from './core/services/typing.service';
import { UserService } from './core/services/user.service';
import { AuthGuard } from './core/guards/auth-guard.service';
import { ProductService } from './shared/services/product.service';
import { ProductTypeService } from './shared/services/product-type.service';
import { TypingInfoService } from './shared/services/typing-info.service';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { AdminComponent } from './modules/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/dashboard/profile/profile.component';
import { PracticeHistoryComponent } from './modules/dashboard/practice-history/practice-history.component';
import { StatisticsComponent } from './modules/dashboard/statistics/statistics.component';
import { TypingResultComponent } from './modules/dashboard/practice-history/typing-result/typing-result.component';
import { ProductListComponent } from './modules/admin/product-list/product-list.component';
import { ProductDetailComponent } from './modules/admin/product-detail/product-detail.component';
import { ProductEditComponent } from './modules/admin/product-edit/product-edit.component';
import { ProductTextComponent } from './modules/admin/product-detail/product-text/product-text.component';

import { InputFilledDirective } from './shared/directives/input-fields.directive';
import { OpenedDirective } from './shared/directives/opened.directive';

import { ReversePipe } from './shared/pipes/reverse.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutComponent,
    StylesComponent,
    InputFilledDirective,
    LoadingComponent,
    AdminComponent,
    DashboardComponent,
    ProfileComponent,
    PracticeHistoryComponent,
    StatisticsComponent,
    TypingResultComponent,
    ReversePipe,
    OpenedDirective,
    ProductListComponent,
    ProductDetailComponent,
    FilterPipe,
    ProductEditComponent,
    ProductTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PracticeModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TypingService,
    UserService,
    ProductService,
    ProductTypeService,
    TypingInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
