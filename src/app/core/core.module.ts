import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';

import { AuthGuard } from './guards/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { TypingService } from './services/typing.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    AppRoutingModule,
    SidebarComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    TypingService,
    UserService,
    UtilService
  ]
})
export class CoreModule { }
