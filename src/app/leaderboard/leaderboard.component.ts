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
  showPage2 = false

  blackjackLeaderboard = [];
  pokerLeaderboard = [];


  ngOnInit() {
    this.getBlackjackLeaderboard();
    this.getVideoPokerLeaderboard();
  }

  getBlackjackLeaderboard() {
    let id = this.as.getUserIdNumber();
    fetch('https://blackjack-java-api.herokuapp.com/blackjack/leaderboard' /* 'http://localhost:8080/blackjack/leaderboard'*/, {
        method: "GET",
        headers: new Headers({
            "Content-type": "application/json"
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        this.blackjackLeaderboard = data;
    });
  }

  getVideoPokerLeaderboard() {
    let id = this.as.getUserIdNumber();
    // let id = 1;
    fetch(`https://blackjack-java-api.herokuapp.com/poker/leaderboard` /* `http://localhost:8080/poker/leaderboard`*/, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        this.pokerLeaderboard = data;
    })
  }

  showPoker() {
    this.showPokerLeaderboard = !this.showPokerLeaderboard;
  }

  showStats2() {
      this.showPage2 = !this.showPage2;
  }

}
