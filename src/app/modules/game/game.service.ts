import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class GameService {

  private roomId: string;

  room = this.socket.fromEvent<any>('room');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private socket: Socket,
              private userService: UserService) { }

  getRoomId(): string {
    return this.roomId;
  }

  getRoom() {
    this.socket.emit('getRoom', this.roomId);
  }

  createRoom() {
    if (this.roomId) {
      this.leaveRoom();
    }
    this.socket.emit('createRoom', { _authHash: this.userService.getHash() },
      (room: any) => {
        this.roomId = room._id;
        this.router.navigate(['/game/queue']);
      });
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', { roomId, _authHash: this.userService.getHash() },
      (room: any) => {
        this.roomId = room._id;
        this.router.navigate(['/game/queue']);
      });
  }

  leaveRoom() {
    this.socket.emit('leaveRoom', { roomId: this.roomId, _authHash: this.userService.getHash() });
  }
}
