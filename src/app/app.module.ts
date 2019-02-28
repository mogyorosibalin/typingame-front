import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GameModule } from './modules/game/game.module';
import { PracticeModule } from './modules/practice/practice.module';
import { SpeedChartModule } from './modules/speed-chart/speed-chart.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';

import { TestsComponent } from './modules/tests/tests.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    StylesComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    CoreModule,
    SharedModule,
    AdminModule,
    DashboardModule,
    GameModule,
    PracticeModule,
    SpeedChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
