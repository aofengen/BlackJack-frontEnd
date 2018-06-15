import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BlackjackService } from '../services/blackjack.service';
import { VideopokerService } from '../services/videopoker.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  showPokerStats = false;
  blackjack = false;
  poker = false;

  currentBlackjack: object;
  currentPoker: object;

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

  pokermoney: number;
  pokerhighmoney: number;
  pokerhandswon: number;
  pokerhandsplayed: number;
  pokerperhandswon: number;
  royalflush: number;
  straightflush: number;
  fourkind: number;
  fullhouse: number;
  flush: number;
  straight: number;
  threekind: number;

  pokertotalmoney: number;
  pokertotalhighmoney: number;
  pokertotalhandswon: number;
  pokertotalhandsplayed: number;
  pokertotalperhandswon: number;
  totalroyalflush: number;
  totalstraightflush: number;
  totalfourkind: number;
  totalfullhouse: number;
  totalflush: number;
  totalstraight: number;
  totalthreekind: number;

  constructor(private as: AuthService, private gs: BlackjackService, private vs: VideopokerService) {
    if (localStorage.getItem("blackjack")) {
        this.currentBlackjack = JSON.parse(localStorage.getItem("blackjack"));
        this.blackjack = true;
    }
    
    if (localStorage.getItem("poker")) {
        this.currentPoker = JSON.parse(localStorage.getItem("poker"));
        this.poker = true;
    } 
   }

  ngOnInit() {
    this.name = this.as.getName();
    this.getBlackjackStats();
    this.getVideoPokerStats();


  }

  getBlackjackStats() {
    let id = this.as.getUserIdNumber();
    fetch(`https://blackjack-java-api.herokuapp.com/blackjack/stats/${id}` /* `http://localhost:8080/blackjack/stats/${id}`*/, {
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

  getVideoPokerStats() {
    let id = this.as.getUserIdNumber();
    fetch(`https://blackjack-java-api.herokuapp.com/poker/stats/${id}` /* `http://localhost:8080/poker/stats/${id}`*/, {
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
        this.pokertotalmoney = data.totalmoney;
        this.pokertotalhighmoney = data.highmoney;
        this.pokertotalhandswon = data.handswon;
        this.pokertotalhandsplayed = data.handsplayed;
        this.totalroyalflush = data.royalflush;
        this.totalstraightflush = data.straightflush;
        this.totalfourkind = data.fourkind;
        this.totalfullhouse = data.fullhouse;
        this.totalflush = data.flush;
        this.totalstraight = data.straight;
        this.totalthreekind = data.threekind;
    })
  }

showPoker() {
    this.showPokerStats = !this.showPokerStats;

  }
}
