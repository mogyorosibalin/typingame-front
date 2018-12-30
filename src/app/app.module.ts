import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PracticeModule } from './modules/practice/practice.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';

import { InputFilledDirective } from './shared/directives/input-fields.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutComponent,
    StylesComponent,
    InputFilledDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PracticeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
