import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  card1 = {
    deck: "hand 1",
    hand: [
      { suit: "hearts", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "spades", value: "three" }
    ], 
    split: true
  }
  
  card2 = {
    deck: "hand 2",
    hand: [
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" },
      { suit: "spades", value: "three" }
    ],
    split: true
  }

  card3 = {
    deck: "hand 3",
    hand: [      
      { suit: "clubs", value: "nine" },
      { suit: "clubs", value: "nine" }
    ],
    split: false
  }

  card4 = {
    deck: "hand 4",
    hand: [],
    split: false
  }

  dealer = {
    hand: [
      { suit: "spades", value: "king"},
      { suit: "spades", value: "ace" }      
    ]
  }

  hand1Total: number;
  hand2Total: number;
  hand3Total: number;
  hand4Total: number;
  dealerTotal: number;

  playerMoney: number;
  playerBet: number;
  isPlayerBet: boolean;

  constructor() { }

  ngOnInit() {
    this.hand1Total = 21;
    this.hand2Total = 21;
    this.hand3Total = 21;
    this.hand4Total = 21;
    this.dealerTotal = 21;

    this.playerMoney = 100.00;
    this.isPlayerBet = false;
  }

  getBet(form: NgForm) {
    this.playerBet = form.value.amount;
    this.playerMoney -= this.playerBet;
    this.isPlayerBet = true;
    document.getElementById('btnDiv1').style.display = 'inline-block';
  }

  hit(x){
    console.log("Hitting on " + x.deck);
  }

  stand(x) {
    console.log(x.split);
    if (x.split == true) {
      switch (x) {
        case this.card1:
          document.getElementById('btnDiv1').style.display = 'none';
          document.getElementById('playerHand2').style.display = 'inline-block';
          break;
        case this.card2:
          document.getElementById('btnDiv2').style.display = 'none';
          document.getElementById('playerHand3').style.display = 'inline-block';
          break;
        case this.card3:
          document.getElementById('btnDiv3').style.display = 'none';
          document.getElementById('playerHand4').style.display = 'inline-block';
          break;
        case this.card4:
          document.getElementById('btnDiv4').style.display = 'none';
          break;
        default:
          break;
      }
    } else {
      console.log("dealer's turn");
      return;
    }
  }

  doubleDown(x) {
    console.log("Doubling Down on " + x.deck);
  }

  split(x, y) {
    console.log("Splitting " + x.deck + " into " + x.deck + " and " + y.deck);
    // this.playerBet += this.playerBet;
    // this.playerMoney -= this.playerMoney;
  }
}
