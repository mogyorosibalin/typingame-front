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
import { TypingService } from './core/services/typing.service';
import { UserService } from './core/services/user.service';
import { AuthGuard } from './core/guards/auth-guard.service';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { AdminComponent } from './modules/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/dashboard/profile/profile.component';
import { PracticeHistoryComponent } from './modules/dashboard/practice-history/practice-history.component';
import { StatisticsComponent } from './modules/dashboard/statistics/statistics.component';
import { TypingResultComponent } from './modules/dashboard/practice-history/typing-result/typing-result.component';

import { InputFilledDirective } from './shared/directives/input-fields.directive';
import { OpenedDirective } from './shared/directives/opened.directive';

import { ReversePipe } from './shared/pipes/reverse.pipe';

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
    OpenedDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PracticeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    TypingService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
