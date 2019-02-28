import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { GameComponent } from './game.component';
import { QueueComponent } from './queue/queue.component';
import { JoinGameComponent } from './join-game/join-game.component';

import { GameService } from './game.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    GameComponent,
    QueueComponent,
    JoinGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    GameRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [
    GameService
  ]
})
export class GameModule {}
