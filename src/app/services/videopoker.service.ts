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

    postStats() {
        let userData = {
            // handsWon: Number(localStorage.getItem("handsWon")),
            // handsPlayed: Number(localStorage.getItem("handsPlayed")),
            // highMoney: Number(localStorage.getItem("highMoney")),
            // totalMoney: Number(localStorage.getItem("totalMoney")),
            // token: localStorage.getItem("token")
            handsWon: 2,
            handsPlayed: 4,
            highMoney: 200,
            totalMoney: 200,
            royalFlush: 0,
            straightFlush: 0,
            fourKind: 0,
            flush: 1,
            straight: 1,
            threeKind: 1
        };
        let id = 1;
        fetch(/*`https://blackjack-java-api.herokuapp.com/poker/stats/${id}`*/ `http://localhost:8080/poker/stats/${id}`, {
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
