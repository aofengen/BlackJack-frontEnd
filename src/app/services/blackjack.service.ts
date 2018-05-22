import { AuthService } from './auth.service'; 
import { Injectable } from '@angular/core';

@Injectable()

export class BlackjackService {

    constructor(private as: AuthService) {}

    resetDeck(x, y) {
        x.bet = 0;
        x.blackjack = false;
        x.bust = false;
        x.deck = y;
        x.doubleDown = false;
        x.hand = [];
        x.result = "";
        x.split = false;
        x.splitAces = false;
        x.stand = false;
        x.total = 0;

        return x;
    }

    resetDealer(x) {
        x.blackjack = false;
        x.bust = false;
        x.deck = "dealer";
        x.hand = [];
        x.soft17 = false;
        x.total = 0;

        return x;
    }

    getMainDeck() {
        let x = []
        fetch(/*'https://blackjack-java-api.herokuapp.com/shuffle'*/ 'http://localhost:8080/shuffle', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let i in data) {
                x.push(data[i]);
            }
            return x;
        })
        return x;
    }

    startHand(x, d, shoe) {
        this.dealCard(x, shoe);
        this.dealCard(d, shoe);

        this.dealCard(x, shoe);
        this.dealCard(d, shoe);
    }

    dealCard(x, shoe) {
        if (shoe.length < 1 || typeof(shoe[0]) != "object") {
            shoe = this.getMainDeck()
        }
        if (x.doubleDown == true || (x.deck == "dealer" && x.hand.length == 1)) {
            shoe[0].doubleDown = true;
        }
        x.hand.push(shoe[0]);
        shoe.shift();

        if(x.hand.length == 2) {
            this.checkBlackjack(x);
        }
        x.total = this.getHandValue(x);
    }

    checkBlackjack(deck) {
        let c1 = deck.hand[0].value;
        let c2 = deck.hand[1].value;
        
        if ((c1 == "ACE" && (c2 == "TEN" || c2 == "JACK" || c2 == "QUEEN" || c2 == "KING")) || (c2 == "ACE" && (c1 == "TEN" || c1 == "JACK" || c1 == "QUEEN" || c1 == "KING"))) {
            deck.blackjack = true;
            deck.result = "BLACKJACK!!!";
        }
    }

    getHandValue(x) {
        let handValue = 0;
        let aces = 0;
        if (x.blackjack == true) {
            handValue = 21;
            x.hand[1].doubleDown = false;
        } else {
            for (let i = 0; i < x.hand.length; i++) {
                if (x.hand[i].doubleDown == true) {
                    break;
                } else {
                    switch (x.hand[i].value.toLowerCase()) {
                        case 'two': handValue+=2; break;
                        case 'three': handValue+=3; break;
                        case 'four': handValue+=4; break;
                        case 'five': handValue+=5; break;
                        case 'six': handValue+=6; break;
                        case 'seven': handValue+=7; break;
                        case 'eight': handValue+=8; break;
                        case 'nine': handValue+=9; break;
                        case 'ten': handValue+=10; break;
                        case 'jack': handValue+=10; break;
                        case 'queen': handValue+=10; break;
                        case 'king': handValue+=10; break;
                        case 'ace': aces+=1; break;
                        default: break;
                    }
                }
            }
            if (x.deck == "dealer" && aces > 0) {
                if (handValue == 6) {
                    x.soft17 = true;
                } else {
                    x.soft17 = false;
                }
            }
            for(let i = 0; i<aces; i++) {
                if(handValue>10) {
                    handValue+=1;
                } else {
                    handValue+=11;
                }
            }
        }
        return handValue;
      }

    findBlankHands(p) {
        let y;
        for (let i = 0; i < p.length; i++) {
            if (p[i].hand.length == 0) {
                y = p[i];
                break;
            }
        }
        return y;
    }

    splitHands(x, y, shoe) {
        y.hand.push(x.hand[1]);
        x.hand.splice(1);

        this.dealCard(x, shoe);
        this.dealCard(y, shoe);

        if (x.hand[0].value == "ACE" && y.hand[0].value == "ACE") {
            x.splitAces = true;
            y.splitAces = true;
        }
    }

    checkBust(x) {
        if (x.total > 21) {
            x.bust = true;
            x.result = "Loser...";
        } 
    }

    checkWinners(p, d) {
        for (let i = 0; i < p.length; i++) {
            if (p[i].doubleDown == true) {
                p[i].hand[2].doubleDown = false;
                p[i].total = this.getHandValue(p[i]);
            }

            if (p[i].hand.length < 2) {
                break;
            } else {
                if (p[i].total > 21) {
                    p[i].bust = true;
                    p[i].result = "Busted."
                } else if (p[i].total == d.total) {
                    p[i].result = "Push!"
                } else if (p[i].total > d.total) {
                    p[i].result = "Winner!!!";
                } else {
                    p[i].result = "Loser..."
                }
            }
        }
    }

    saveStats() {
        let id = this.as.getUserIdNumber();
        if (id == undefined || id == NaN || id == null) {
            return;
        } else {
            let userData = {
                handsWon: Number(localStorage.getItem("handsWon")),
                handsPlayed: Number(localStorage.getItem("handsPlayed")),
                blackjacks: Number(localStorage.getItem("blackjacks")),
                highMoney: Number(localStorage.getItem("highMoney")),
                totalMoney: Number(localStorage.getItem("totalMoney")),
                token: localStorage.getItem("token")
            };
            fetch(/*`https://blackjack-java-api.herokuapp.com/stats/${id}`*/ `http://localhost:8080/stats/${id}`, {
                method: "POST",
                headers: new Headers({
                    "Content-type": "application/json"
                }),
                body: JSON.stringify(userData)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
        }
    }
}