export class GameService {

    getMainDeck() {
        let x = []
        fetch('https://blackjack-java-api.herokuapp.com/shuffle', {
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

        x.total = this.getHandValue(x.hand);
        d.total = this.getHandValue(d.hand);
        return x && d;
    }

    splitHands(x, y, shoe) {
        y.hand.push(x.hand[1]);
        x.hand.splice(1);

        this.dealCard(x, shoe);
        this.dealCard(y, shoe);

        x.total = this.getHandValue(x.hand);
        y.total = this.getHandValue(y.hand);
        return x && y;
    }

    dealCard(deck, shoe) {
        deck.hand.push(shoe[0]);
        shoe.shift();
    }

    getHandValue(x) {
        let handValue = 0;
        let aces = 0;
        console.log(x);
        for (let i = 0; i < x.length; i++) {
          switch (x[i].value.toLowerCase()) {
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
        for(let i = 0; i<aces; i++) {
			if(handValue>10) {
				handValue+=1;
			} else {
				handValue+=11;
            }
		}
        return handValue;
      }
}