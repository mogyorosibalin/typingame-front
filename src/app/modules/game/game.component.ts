import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gameService: GameService) { }

  ngOnInit() {
  }

  onCreateGame() {
    this.gameService.createRoom();
  }

}
