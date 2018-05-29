import { AuthService } from './auth.service'; 
import { Injectable } from '@angular/core';

@Injectable()

export class VideopokerService {

	constructor(private as: AuthService) {}

    getMainDeck() {
        let x = [];
        fetch(/*'https://blackjack-java-api.herokuapp.com/poker/shuffle'*/ 'http://localhost:8080/poker/shuffle', {
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

    dealCards(p, d) {
        for (let i = 0; i < 5; i++) {
			p.hand.push(d[0]);
			p.hand[i].doubleDown = false;
			d.push(d.shift());
        }
    }

    tradeCards(a, p, d) {
        let i = 5;
        while(i > 0) {
            if (a.includes(i)) {
				p.hand.splice(i-1, 1, d[0]);
				p.hand[i-1].doubleDown = false;
                d.push(d.shift());
            }
            i--;
        }
    }

    checkWinner(hand) {
		let suits = []
		let values = []
				
		for (let aCard of hand) {
			suits.push(aCard.suit);
			values.push(aCard.value);
		}
		
		let cards = [];
		cards = this.getValues(values);
		
		let flush = this.checkFlush(suits);
		let straight = this.checkStraight(cards);
		let pair = this.checkPair(values);
				
		if (flush == true) {
			if (straight == true) {
				if (cards.includes(14)) {
					return "Royal Flush";
				} else {
					return "Straight Flush";
				}
			} else {
				return "Flush";
			}
		} else if (straight == true) {
			return "Straight";
		} else if (pair != "no pair") {
			return pair;
		} else {
			return "nothing...";
		}
    }
    
    getValues(values) {
		let num = 0;
		let numbers = [];
		for (let value of values) {
			switch(value) {
				case "TWO": num=2; break;
				case "THREE": num=3; break;
				case "FOUR": num=4; break;
				case "FIVE": num=5; break;
				case "SIX": num=6; break;
				case "SEVEN": num=7; break;
				case "EIGHT": num=8; break;
				case "NINE": num=9; break;
				case "TEN": num=10; break;
				case "JACK": num=11; break;
				case "QUEEN": num=12; break;
				case "KING": num=13; break;
				case "ACE": num=1; break;
				default: break;
			}
			
			let x = numbers.length;
			if (x == 0) {
				numbers.push(num);
			} else {
				for (let i = 0; i <= x; i++) {
					if (i == x) {
						numbers.push(num);
					} else if (num <= numbers[i]) {
						numbers.splice(i, 0, num);
						break;
					}
				}
			}
		}
		
		while (numbers.includes(1)) {
			if (numbers.includes(2) && numbers.includes(3) && numbers.includes(4) && numbers.includes(5)) {
				break;
			} else {
				let index = numbers.indexOf(1);
				numbers.splice(numbers.indexOf(1), 1).push(14);
			}
		}
 		
		return numbers;
	}

	checkPair(values) {
		let isPair = "";
		let matches = 0;
		for (let i = 0; i < values.length; i++) {
			for (let j = i + 1; j < values.length; j++) {
				if (values[i] == values[j]) {
					matches++;
				}
			}
		}
		
		switch (matches) {
			case 0: isPair = "no pair"; break;
			case 1: isPair = "One Pair"; break;
			case 2: isPair = "Two Pair"; break;
			case 3: isPair = "Three of a Kind"; break;
			case 4: isPair = "Full House"; break;
			case 6: isPair = "Four of a Kind"; break;
			default: isPair = "no pair"; break;
		}
		
		return isPair;
	}

	checkStraight(cards) {
		let i = 0;
		while(i < 4) {
			if ((cards[i] + 1) != cards[i+1]) {
				return false;
			}
			i++;
		}
		return true;
	}

	checkFlush(suits) {
		let suit = suits[0];
		if (suit == suits[1] && suit == suits[2] && suit == suits[3] && suit == suits[4]) {
			return true;
		} else {
			return false;
		}
	}

    postStats() {
		let id = this.as.getUserIdNumber();
		let data = JSON.parse(localStorage.getItem("poker"));
		if (id == undefined || id == NaN || id == null) return;
		else {
			fetch(/*`https://blackjack-java-api.herokuapp.com/poker/stats/${id}`*/ `http://localhost:8080/poker/stats/${id}`, {
				method: "POST",
				headers: new Headers({
					"Content-type": "application/json"
				}),
				body: JSON.stringify(data)
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
