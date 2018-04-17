import { Router } from '@angular/router';
import { Users } from '../shared/users.model';
import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class AuthService {
    token: string;
    private userInfo: Users[] = [];
    
    constructor(public activeModal: NgbActiveModal, private router: Router) {}

    newUser(name: string, email: string, username: string, password: string) {
        let newUser = {
                email: email,
                name: name,
                username: username,
                password: password
          }

        fetch(/*'https://blackjack-java-api.herokuapp.com/signup'*/ 'http://localhost:8080/signup', {
            method: "POST",
            headers: new Headers ({
                'Content-Type': "application/json"
            }),
            body: JSON.stringify(newUser)
        })
        .then((response) => {
            // console.log(response.json());
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.token = data.token;
            this.router.navigate([`/profile/${data.id}`]); 
        })
        .catch((error) => {
            console.log(error);
        });
    }

    loginUser(email:string, password: string) {
            let userData = {email: email, password: password}
		fetch(/*'https://blackjack-java-api.herokuapp.com/login'*/ 'http://localhost:8080/login', {
            method: "POST",
            headers: new Headers ({
                'Content-Type': "application/json"
            }),
            body: JSON.stringify(userData)
        })
  	    .then((response) => {	
            return response.json();
        })
  		.then((data) =>{ 
            if (data.token) {
                console.log(data);
                this.token = data.token
                this.router.navigate([`/profile/${data.id}`]); 
            }
            
            if (data.error) {
                console.log(data.error);
            }
        })
    	.catch(error => console.log(error));
	}

    isAuthenticated() {
        return this.token != null;
    }
}