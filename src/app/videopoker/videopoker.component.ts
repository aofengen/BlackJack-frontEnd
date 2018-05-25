import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { VideopokerService } from '../services/videopoker.service';

@Component({
  selector: 'app-videopoker',
  templateUrl: './videopoker.component.html',
  styleUrls: ['./videopoker.component.css']
})
export class VideopokerComponent implements OnInit {

  constructor(private vs: VideopokerService) { }

  playerMoney: number;
  playerMoneyAvailable: number;
  playerBet: number;
  
  tradingCards = false;
  isPlayerBet = false;
  handOver = false;
  outOfMoney = false;

  deck = {
    hand: [],
    result: ""
  }

  mainDeck = [];
  tradeCards = [];

  ngOnInit() {
    this.mainDeck = this.vs.getMainDeck();
    if (Number(localStorage.getItem("money")) > 0) {
      this.playerMoney = Number(localStorage.getItem("money"));
    } else {
      this.playerMoney = 50;
    }
  }

  postStats() {
    this.vs.postStats();
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

      this.vs.dealCards(this.deck, this.mainDeck);
    }
  }

  reset() {
    this.mainDeck = this.vs.getMainDeck();
    this.deck.hand = [];
    this.deck.result = "";
    this.handOver = false;
    this.tradingCards = false;
    this.vs.dealCards(this.deck, this.mainDeck);
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
    this.vs.tradeCards(this.tradeCards, this.deck, this.mainDeck);
    this.deck.result = this.vs.checkWinner(this.deck.hand);
    console.log(this.deck.result);
    this.playerMoney = this.handleMoney(this.deck.result, this.playerMoney, this.playerBet);
    this.handOver = true;
  }

  handleMoney(result, pMoney, pBet) {
    switch(result) {
			case "Royal Flush":
				pMoney += pBet * 250;
				break;
			case "Straight Flush": 
				pMoney += pBet * 100;
				break;
			case "Four of a Kind":
				pMoney += pBet * 40;
				break;
			case "Full House":
				pMoney += pBet * 15;
				break;
			case "Flush":
				pMoney += pBet * 8;
				break;
			case "Straight":
				pMoney += pBet * 5;
				break;
			case "Three of a Kind":
				pMoney += pBet * 3;
				break;
			case "Two Pair":
				pMoney += pBet;
        break;
      case "nothing...":
        pMoney -= pBet;
        break;
			default:
				break;
		}
		return pMoney;
  }
}
