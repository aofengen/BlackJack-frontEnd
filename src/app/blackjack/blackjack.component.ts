import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BlackjackService } from '../services/blackjack.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {


  constructor(public gs: BlackjackService) { }
  
  blackjack: {
    handsPlayed: number,
    handsWon: number,
    highMoney: number,
    blackjacks: number,
    totalMoney: number,
  }

  card1 = {
    bet: 0,
    blackjack: false,
    bust: false,
    deck: "hand 1",
    doubleDown: false,
    hand: [],
    result: "",
    split: false,
    splitAces: false,
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
    splitAces: false,
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
    splitAces: false,
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
    splitAces: false,
    stand: false,
    total: 0
  }

  dealer = {
    blackjack: false,
    bust: false,
    deck: "dealer",
    hand: [],
    soft17: false,
    total: 0
  }

  pHands = [this.card1, this.card2, this.card3, this.card4];
  shoe = [];

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

  ngOnInit() {
    if (localStorage.getItem("blackjack")) {
      this.blackjack = JSON.parse(localStorage.getItem("blackjack"));
      this.playerMoney = this.blackjack.totalMoney;
    } else {
      this.blackjack = {
        handsWon: 0,
        handsPlayed: 0,
        highMoney: 0,
        totalMoney: 100,
        blackjacks: 0
      }
      this.playerMoney = this.blackjack.totalMoney;
      localStorage.setItem("blackjack", JSON.stringify(this.blackjack));
    }
    
    this.shoe = this.gs.getMainDeck();
    this.playerBet = 0;
    this.isPlayerBet = false;
  }

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
    this.playerBet = Number(form.value.amount);
    if (isNaN(this.playerBet)) {
      alert("Please enter a number.");
    } else if (this.playerBet < 1) {
      alert("You must bet at least $1!");
    } else if (this.playerBet > this.playerMoney) {
      alert("You can't bet more than you have!");
    } else {
      this.card1.bet = this.playerBet;
      this.playerMoneyAvailable -= this.playerBet;
      this.isPlayerBet = true;

      this.gs.startHand(this.card1, this.dealer, this.shoe);
      this.gs.checkBlackjack(this.card1);
      this.gs.checkBlackjack(this.dealer);

      if (this.card1.blackjack == true || this.dealer.blackjack == true) {
        this.dealer.hand[1].doubleDown = false;
        this.stand(this.card1, this.dealer);
        if (this.dealer.blackjack == true) {
          this.handleMoney([this.card1], this.dealer);
        } else {
          this.handleMoney([this.card1]);
        }
        if (this.playerMoney < 1) {
          this.outOfMoney = true;
        } else {
          this.handOver = true;
        }
      }
    }
  }

  hit(x) {
      this.gs.dealCard(x, this.shoe);
      this.gs.getHandValue(x);
      this.gs.checkBust(x);
    if (x.deck == "dealer") {
      return;
    } else {
      if (x.bust == true) {
        this.stand(x);
      }
    }
  }

  stand(x, y?) {
    if (y != undefined) {
      x.total = this.gs.getHandValue(x);
      y.total = this.gs.getHandValue(y);
      x.stand = true;
    } else {
      if (x.split == true) {
        switch (x) {
          case this.card1:
            x.stand = true;
            break;
          case this.card2:
            x.stand = true;
            break;
          case this.card3:
            if(this.card3.splitAces != true) {
              x.stand = true;
              break;
            } else {
              x.stand = true;
              this.card4.stand = true;
              this.dealerTurn(this.dealer);
              break;
          }
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
  }

  doubleDown(x) {
    if (x.hand.length > 2) {
      alert("You cannot double down after you take a card.");
    } else if (this.playerMoneyAvailable < x.bet) {
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

  split(x) {
    if (this.playerMoneyAvailable < x.bet) {
      alert("You do not have enough money to split.");
    } else {
      let y = this.gs.findBlankHands(this.pHands);
      console.log(y);
      this.playerBet += x.bet;
      this.playerMoneyAvailable -= x.bet;
    
      x.split = true;
      y.bet = x.bet;
      this.gs.splitHands(x, y, this.shoe);
    }
  }

  dealerTurn(x) {
    console.log("dealer's turn");
    x.hand[1].doubleDown = false;
    x.total = this.gs.getHandValue(x);

    while(x.total < 17 || x.soft17 == true) {
      this.hit(x);
    }

    this.gs.checkBust(x);

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

  handleMoney(p, d?) {
    if (d != undefined) {
      if (p[0].blackjack == true) {
        p[0].result = "Push.";
        this.stats("not win");
      } else {
        p[0].result = "Dealer Blackjack...";
        this.stats("not win");
        this.playerMoney -= p[0].bet;
      }
    } else {
      for(let i = 0; i < p.length; i++) {
        if (p[i].result == "") {
          break;
        } else if (p[i].bust == true) {
          this.stats("not win");
          this.playerMoney -= p[i].bet;
        } else {
          switch (p[i].result) {
            case "BLACKJACK!!!":
              p[i].result = "BLACKJACK!!!";
              this.stats("blackjack");
              this.playerMoney += p[i].bet * 1.5;
              this.blackjack.totalMoney += p[i].bet * 1.5;
              break;
            case "Winner!!!":
              p[i].result = "You Win!";
              this.stats("win");
              this.playerMoney += p[i].bet;
              this.blackjack.totalMoney += p[i].bet;
              break;
            case "Push!":
              p[i].result = "Push.";
              this.stats("not win");
              break;
            case "Loser...":
              p[i].result = "You lost...";
              this.stats("not win");
              this.playerMoney -= p[i].bet;
              break;
            default:
              break;
          }
        }
      }
    }
    if (this.playerMoney < 1) {
      this.updateStats();
      this.gs.saveStats();
      this.outOfMoney = true;
    } else {
      this.handOver = true;
      if (this.playerMoney > Number(localStorage.getItem("highMoney"))) {
        localStorage.setItem("highMoney", this.playerMoney.toString());
      }
      this.updateStats();
    }
  }

  stats(result: string) {
    switch (result) {
      case "blackjack":
        this.blackjack.blackjacks += 1;
        this.blackjack.handsWon += 1;
        this.blackjack.handsPlayed += 1;
        break;
      case "win":
        this.blackjack.handsWon += 1;
        this.blackjack.handsPlayed += 1;
        break;
      case "not win":
        this.blackjack.handsPlayed += 1;
        break;
      default:
        this.blackjack.handsPlayed += 1;
        break;
    }
  }

  updateStats() {
    localStorage.removeItem("blackjack");
    localStorage.setItem("blackjack", JSON.stringify(this.blackjack));
  }
}