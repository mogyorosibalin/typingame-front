import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GameService } from '../game.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.sass']
})
export class JoinGameComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gameService: GameService) { }

  ngOnInit() {
  }

  onJoin(form: NgForm) {
    this.gameService.joinRoom(form.value.roomId);
  }
}
