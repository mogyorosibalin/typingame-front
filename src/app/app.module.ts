import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PracticeModule } from './modules/practice/practice.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';

import { AuthService } from './core/auth/auth.service';

import { InputFilledDirective } from './shared/directives/input-fields.directive';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AdminComponent } from './modules/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutComponent,
    StylesComponent,
    InputFilledDirective,
    LoadingComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PracticeModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
