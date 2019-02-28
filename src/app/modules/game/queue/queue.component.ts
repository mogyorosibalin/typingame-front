import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from '../game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.sass']
})
export class QueueComponent implements OnInit, OnDestroy {

  room: any;
  private _roomSub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getRoom();
    this._roomSub = this.gameService.room.subscribe(room => {
      this.room = room;
      console.log(this.room);
    });
  }

  ngOnDestroy() {
    this._roomSub.unsubscribe();
    this.gameService.leaveRoom();
    alert('You are quitting the queue!');
  }

  getRoomId() {
    return this.gameService.getRoomId();
  }
}
