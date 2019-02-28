import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { QueueComponent } from './queue/queue.component';
import { JoinGameComponent } from './join-game/join-game.component';

import { AuthGuard } from '../../core/guards/auth-guard.service';

const gameRoutes: Routes = [
  {
    path: 'game',
    component: GameComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'queue', component: QueueComponent },
      { path: 'join-game', component: JoinGameComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(gameRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule {}
