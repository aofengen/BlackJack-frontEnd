import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private as: AuthService) { }

  leaderboard = [];

  ngOnInit() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    let id = this.as.getUserIdNumber();
    fetch('https://blackjack-java-api.herokuapp.com/leaderboard' /*'http://localhost:8080/leaderboard'*/, {
        method: "GET",
        headers: new Headers({
            "Content-type": "application/json"
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        this.leaderboard = data;
    });
  }

}
