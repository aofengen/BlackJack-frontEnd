import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  constructor(public gs: GameService) { }

  ngOnInit() {
    this.playerMoney = 100.00;
    this.playerBet = 0;
    this.isPlayerBet = false;
  }

  shoe = this.gs.getMainDeck();

  card1 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 1",
    doubleDown: false,
    hand: [
      // { suit: "hearts", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "spades", value: "three" },
      // { suit: "spades", value: "three" },
      // { suit: "spades", value: "three" },
      // { suit: "spades", value: "three" }
    ],
    split: false,
    stand: false,
    total: 0
  }
  
  card2 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 2",
    doubleDown: false,
    hand: [
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" },
      // { suit: "spades", value: "three" }
    ],
    split: false,
    stand: false,
    total: 0
    }

  card3 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 3",
    doubleDown: false,
    hand: [      
      // { suit: "clubs", value: "nine" },
      // { suit: "clubs", value: "nine" }
    ],
    split: false,
    stand: false,
    total: 0
  }

  card4 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 4",
    doubleDown: false,
    hand: [],
    split: false,
    stand: false,
    total: 0
  }

  dealer = {
    blackjack: false,
    bust: false,
    hand: [
      // { suit: "spades", value: "king"},
      // { suit: "spades", value: "ace" }      
    ],
    total: 0
  }

  hand1Total: number;
  hand2Total: number;
  hand3Total: number;
  hand4Total: number;
  dealerTotal: number;

  playerMoney: number;
  playerBet: number;
  isPlayerBet: boolean;
  
  getBet(form: NgForm) {
    this.playerBet = form.value.amount;
    this.card1.bet = this.playerBet;
    this.playerMoney -= this.playerBet;
    this.isPlayerBet = true;

    this.gs.startHand(this.card1, this.dealer, this.shoe);
    // this.gs.startHand(this.dealer, shoe);
  }

  hit(x){
    x.hand.push(this.shoe[0]);
    this.shoe.shift();
    x.total = this.gs.getHandValue(x.hand);
    console.log(x.total);
    console.log("card1 total: " + this.card1.total);
  }

  stand(x) {
    console.log(x.split);
    if (x.split == true) {
      switch (x) {
        case this.card1:
          x.stand = true;
          break;
        case this.card2:
          x.stand = true;
          break;
        case this.card3:
          x.stand = true;
          break;
        case this.card4:
          x.stand = true;
          this.dealerTurn(this.dealer);
          break;
        default:
          break;
      }
    } else {
      this.dealerTurn(this.dealer);
      return;
    }
  }

  doubleDown(x) {
    console.log("Doubling Down on " + x.deck);
    this.playerMoney -= x.bet;
    this.playerBet += x.bet;
    
  }

  split(x, y) {
    console.log("Splitting " + x.deck + " into " + x.deck + " and " + y.deck);
    this.playerBet += x.bet;
    this.playerMoney -= x.bet;
    
    switch(x.deck){
      case 'hand 1':
      x.split = true;
      y.bet = x.bet;
      this.gs.splitHands(x, y, this.shoe);
      break;
    case 'hand 2':
      x.split = true;
      y.bet = x.bet;
      this.gs.splitHands(x, y, this.shoe);
      break;
    case 'hand 3':
      x.split = true;
      y.bet = x.bet;
      this.gs.splitHands(x, y, this.shoe);
      break;
    default:
      break;
    }
  }

  dealerTurn(x) {
    console.log("dealer's turn");
  }
}