import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BlackjackService } from '../services/blackjack.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  name: string;
  money: number;
  handsWon: number;
  handsPlayed: number;
  perHandsWon: number;
  blackjacks: number;
  highMoney: number;

  totalHandsWon: number;
  totalHandsPlayed: number;
  totalPerHandsWon: number;
  totalBlackjacks: number;
  totalHighMoney: number;
  totalMoneyWon: number;

  constructor(private as: AuthService, private gs: BlackjackService) { }

  ngOnInit() {
    this.name = this.as.getName();
    this.getStats();
    
    this.money = Number(localStorage.getItem('money'));
    this.handsWon = Number(localStorage.getItem("handsWon"));
    this.handsPlayed = Number(localStorage.getItem("handsPlayed"));
    this.perHandsWon = (this.handsWon/this.handsPlayed) * 100;
    this.blackjacks = Number(localStorage.getItem("blackjacks"));
    this.highMoney = Number(localStorage.getItem("highMoney")); 
  }

  getStats() {
    let id = this.as.getUserIdNumber();
    fetch(/*`https://blackjack-java-api.herokuapp.com/stats/${id}`*/ `http://localhost:8080/stats/${id}`, {
        method: "GET",
        headers: new Headers({
            "Content-type": "application/json"
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.totalHandsWon = data.handswon;
            this.totalHandsPlayed = data.handsplayed;
            this.totalPerHandsWon = (data.handswon/data.handsplayed) * 100;
            this.totalBlackjacks = data.blackjacks;
            this.totalHighMoney = data.mostmoneywon;
            this.totalMoneyWon = data.totalmoneywon;
        }
    });
}

}
