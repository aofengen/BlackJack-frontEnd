import { AuthService } from './auth.service'; 
import { Injectable } from '@angular/core';

@Injectable()

export class VideopokerService {

    getMainDeck() {
        let x = []
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
}
