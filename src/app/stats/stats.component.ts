import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  name: string;
  money: number;

  constructor(private as: AuthService, private gs: GameService) { }

  ngOnInit() {
    this.name = this.as.getName();
    this.gs.getStats();
    
    this.money = Number(localStorage.getItem('money'));
  }

}
