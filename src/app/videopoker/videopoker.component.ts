import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { VideopokerService } from '../services/videopoker.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-videopoker',
  templateUrl: './videopoker.component.html',
  styleUrls: ['./videopoker.component.css']
})
export class VideopokerComponent implements OnInit {

  constructor(private vs: VideopokerService, private as: AuthService) {}

  playerMoney: number;
  playerMoneyAvailable: number;
  playerBet: number;
  
  tradingCards = false;
  isPlayerBet = false;
  handOver = false;
  outOfMoney = false;

  poker: {
		handsPlayed: number,
		handsWon: number,
		totalMoney: number,
		highMoney: number,
		royalFlush: number,
		straightFlush: number,
		fourKind: number,
		fullHouse: number,
		flush: number,
		straight: number,
		threeKind: number
	}

  deck = {
    hand: [],
    result: ""
  }

  dealingDeck = [];
  tradeCards = [];

  ngOnInit() {
    this.dealingDeck = this.vs.getMainDeck();
    if (localStorage.getItem("poker")) {
      this.poker = JSON.parse(localStorage.getItem("poker"));
    } else {
      let userId = this.as.getUserIdNumber();
      this.poker = {
        handsPlayed: 0,
        handsWon: 0,
        totalMoney: 0,
        highMoney: 0,
        royalFlush: 0,
        straightFlush: 0,
        fourKind: 0,
        fullHouse: 0,
        flush: 0,
        straight: 0,
        threeKind: 0
      }
      localStorage.setItem("poker", JSON.stringify(this.poker));
    }
    console.log(this.poker);
    if (this.poker.totalMoney > 0) {
      this.playerMoney = this.poker.totalMoney;
    } else {
      this.playerMoney = 50;
      this.poker.totalMoney = this.playerMoney;
    }
  }

  shuffle() {
		let tmpDeck = [];
		let randomCardIndex = 0;
		let i = this.dealingDeck.length;
		
		while (i > 0) {
			randomCardIndex = Math.floor(Math.random() * i);
			tmpDeck.push(this.dealingDeck[randomCardIndex]);
      this.dealingDeck.splice(randomCardIndex, 1);
      i--;
    }
		return tmpDeck;
	}

  getBet(form: NgForm) {
    this.playerMoneyAvailable = this.playerMoney;
    this.playerBet = Number(form.value.amount);
    if (isNaN(this.playerBet)) {
      alert("Please enter a number.");
    } else if (this.playerBet < 1) {
      alert("You must bet at least $1!");
    } else if (this.playerBet > 5) {
      alert("You have exceeded the maximum bet allowed!");
    } else if (this.playerBet > this.playerMoney) {
      alert("You can't bet more than you have!");
    } else {
      this.playerMoneyAvailable -= this.playerBet;
      this.isPlayerBet = true;

      this.vs.dealCards(this.deck, this.dealingDeck);
    }
  }

  reset() {
    this.dealingDeck = this.shuffle();
    this.deck.hand = [];
    this.deck.result = "";
    this.tradeCards = [];
    this.handOver = false;
    this.isPlayerBet = false;
    this.tradingCards = false;
  }

  tradeCard(x) {
    if (this.tradeCards.includes(x)) return;
    else this.tradeCards.push(x); 
  }

  keepCard(x) {
    if (this.tradeCards.includes(x)) this.tradeCards.splice(this.tradeCards.indexOf(x), 1);
    else return;
  }

  throwCards() {
    this.tradingCards = true;
    this.vs.tradeCards(this.tradeCards, this.deck, this.dealingDeck);
    this.deck.result = this.vs.checkWinner(this.deck.hand);
    this.playerMoney = this.handleMoney(this.deck.result, this.playerMoney, this.playerBet);
    this.handOver = true;
  }

  handleMoney(result, pMoney, pBet) {
    this.poker.handsPlayed++;

    switch(result) {
      case "Royal Flush":
        this.poker.royalFlush++;
        this.poker.totalMoney += pBet * 250;
				pMoney += pBet * 250;
				break;
      case "Straight Flush": 
        this.poker.straightFlush++;
        this.poker.totalMoney += pBet * 100;
				pMoney += pBet * 100;
				break;
      case "Four of a Kind":
        this.poker.fourKind++;
        this.poker.totalMoney += pBet * 40;
				pMoney += pBet * 40;
				break;
      case "Full House":
        this.poker.fullHouse++;
        this.poker.totalMoney += pBet * 15;
				pMoney += pBet * 15;
				break;
      case "Flush":
        this.poker.flush++
        this.poker.totalMoney += pBet * 8;
				pMoney += pBet * 8;
				break;
      case "Straight":
        this.poker.straight++
        this.poker.totalMoney += pBet * 5;
				pMoney += pBet * 5;
				break;
      case "Three of a Kind":
        this.poker.threeKind++;
        this.poker.totalMoney += pBet * 3;
				pMoney += pBet * 3;
				break;
      case "Two Pair":
        this.poker.totalMoney += pBet;
				pMoney += pBet;
        break;
      case "nothing...":
        this.poker.totalMoney -= pBet;
        pMoney -= pBet;
        break;
      default:
        this.poker.totalMoney = pMoney;
				break;
    }
    if (result != "nothing...") {
      this.poker.handsWon++;
      if (pMoney > this.poker.highMoney) this.poker.highMoney = pMoney;
    }
    localStorage.removeItem("poker");
    localStorage.setItem("poker", JSON.stringify(this.poker));
    console.log(this.poker);
		return pMoney;
  }
}
