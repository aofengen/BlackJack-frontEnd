import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private as: AuthService) { }

  showPokerLeaderboard = false;

  leaderboard = [];

  ngOnInit() {
    this.getBlackjackLeaderboard();
    this.getVideoPokerLeaderboard();
  }

  getBlackjackLeaderboard() {
    let id = this.as.getUserIdNumber();
    fetch(/*'https://blackjack-java-api.herokuapp.com/blackjack/leaderboard'*/ 'http://localhost:8080/blackjack/leaderboard', {
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

  getVideoPokerLeaderboard() {
    let id = 1;
    fetch(/*`https://blackjack-java-api.herokuapp.com/poker/leaderboard`*/ `http://localhost:8080/poker/leaderboard`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
  }

  showPoker() {
    this.showPokerLeaderboard = !this.showPokerLeaderboard;
  }

}
