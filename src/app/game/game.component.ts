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

  pHands = [];

  card1 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 1",
    doubleDown: false,
    hand: [],
    result: "",
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
    hand: [],
    result: "",
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
    hand: [],
    result: "",
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
    result: "",
    split: false,
    stand: false,
    total: 0
  }

  dealer = {
    blackjack: false,
    bust: false,
    deck: "dealer",
    hand: [],
    total: 0
  }

  hand1Total: number;
  hand2Total: number;
  hand3Total: number;
  hand4Total: number;
  dealerTotal: number;

  playerMoney: number;
  playerMoneyAvailable: number;
  playerBet: number;
  
  isPlayerBet = false;
  handOver = false;
  outOfMoney = false;

  reset() {
    this.handOver = false;
    this.isPlayerBet = false;

    this.gs.resetDeck(this.card1, "hand 1");
    this.gs.resetDeck(this.card2, "hand 2");
    this.gs.resetDeck(this.card3, "hand 3");
    this.gs.resetDeck(this.card4, "hand 4");

    this.gs.resetDealer(this.dealer);
  }

  getBet(form: NgForm) {
    this.playerMoneyAvailable = this.playerMoney;

    this.playerBet = form.value.amount;
    if (this.playerBet > this.playerMoney) {
      alert("You can't bet more than you have!");
    } else {
      this.card1.bet = this.playerBet;
      this.playerMoneyAvailable -= this.playerBet;
      this.isPlayerBet = true;

      this.gs.startHand(this.card1, this.dealer, this.shoe);
      if (this.card1.blackjack == true) {
        this.handleMoney([this.card1]);
      }
    }
  }

  hit(x) {
    console.log("dealer draws a card");
      this.gs.dealCard(x, this.shoe);
      this.gs.getHandValue(x.hand);
      this.gs.checkBust(x);
    if (x.deck == "dealer") {
      return;
    } else {
      if (x.bust == true) {
        this.stand(x);
      }
    }
  }

  stand(x) {
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
      x.stand = true;
      this.dealerTurn(this.dealer);
      return;
    }
  }

  doubleDown(x) {
    if (x.hand.length > 2) {
      alert("You cannot double down after you take a card.");
    } else if (this.playerMoneyAvailable < x.bet * 2) {
      alert("You do not have enough money to double down."); 
    } else {
      console.log("Doubling Down on " + x.deck + ". Card will be hidden until after dealer's turn has finished.");
      x.doubleDown = true;
      this.gs.dealCard(x, this.shoe);
      this.playerMoneyAvailable -= x.bet;
      this.playerBet += x.bet;
      x.bet += x.bet;
      this.stand(x);
    }
  }

  split(x, y) {
    console.log("Splitting " + x.deck + " into " + x.deck + " and " + y.deck);
    if (this.playerMoneyAvailable < x.bet * 2) {
      alert("You do not have enough money to split.");
    } else {
      this.playerBet += x.bet;
      this.playerMoneyAvailable -= x.bet;
      
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
  }

  dealerTurn(x) {
    console.log("dealer's turn");
    x.hand[1].doubleDown = false;
    x.total = this.gs.getHandValue(x.hand);

    while(x.total < 17) {
      this.hit(x);
    }

    this.gs.checkBust(x);
    this.pHands = [this.card1, this.card2, this.card3, this.card4];

    if (x.bust == true) {
      console.log("Everyone Wins!");
      for (let i in this.pHands) {
        if (this.pHands[i].hand.length < 2) {
          break;
        } else if (this.pHands[i].blackjack == true || this.pHands[i].bust == true) {
          console.log(this.pHands[i].deck + " already taken care of.")
        } else {
          this.pHands[i].result = "Winner!!!"
        }
        this.handleMoney(this.pHands);
      }
    } else {
      console.log("Let's find out who won!");
      this.gs.checkWinners(this.pHands, this.dealer);
      this.handleMoney(this.pHands);
    } 
  }

  handleMoney(p) {
    for(let i = 0; i < p.length; i++) {
      if (p[i].result == "") {
        break;
      } else if (p[i].bust == true) {
        this.playerMoney -= p[i].bet;
      } else {
        switch (p[i].result) {
          case "BLACKJACK!!!":
            p[i].result = "BLACKJACK!!!";
            this.playerMoney += p[i].bet * 1.5;
            break;
          case "Winner!!!":
            p[i].result = "You Win!";
            this.playerMoney += p[i].bet;
            break;
          case "Push!":
            p[i].result = "Push.";
            break;
          case "Loser..." || p[i].bust == true:
            p[i].result = "You lost...";
            this.playerMoney -= p[i].bet;
            break;
          default:
            break;
        }
      }
    }
    if (this.playerMoney <= 0) {
      this.outOfMoney = true;
    } else {
    this.handOver = true;
    }
  }

}