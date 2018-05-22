import { Router } from '@angular/router';
import { Users } from '../shared/users.model';
import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class AuthService {
    token: string;
    name: string;
    username: string;
    email: string;
    userIdNumber: number;
    // private userInfo: Users[] = [];
    
    constructor(public activeModal: NgbActiveModal, private router: Router) {}

    newUser(name: string, email: string, username: string, password: string) {
        let newUser = {
                email: email,
                name: name,
                username: username,
                password: password
          }

        fetch(/*'https://blackjack-java-api.herokuapp.com/signup'/*/ 'http://localhost:8080/signup', {
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
            localStorage.setItem("token", data.token);
            this.token = data.token;
            this.name = data.name;
            this.username = data.username;
            this.email = data.email;
            this.userIdNumber = data.id;
            this.router.navigate([`/profile/${data.id}`]); 
        })
        .catch((error) => {
            alert(error);
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
                localStorage.setItem("token", data.token);
                this.token = data.token;
                this.name = data.name;
                this.username = data.username;
                this.email = data.email;
                this.userIdNumber = data.id;
                this.router.navigate([`/profile/${data.id}`]); 
            }
            
            if (data.error) {
                alert(data.error);
            }
        })
    	.catch(error => alert(error));
    }
    
    changeUserInfo(newName:string, newUsername:string, newEmail:string, password:string) {
        let userData = {
            newName: newName,
            newUsername: newUsername,
            newEmail: newEmail,
            password: password,
            id: this.userIdNumber,
            token: localStorage.getItem("token")
        }
        fetch(/*'https://blackjack-java-api.herokuapp.com/changeInfo'*/ 'http://localhost:8080/changeInfo', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    }

    changeUserPassword(oldPass:string, newPass:string, confirmPass:string) {
        let userData = {
            oldPass: oldPass,
            newPass: newPass,
            confirmPass: confirmPass,
            id: this.userIdNumber,
            token: localStorage.getItem("token")
        }
        fetch(/*'https://blackjack-java-api.herokuapp.com/changePass'*/ 'http://localhost:8080/changePassword', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userData)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
    }

    isAuthenticated() {
        if (this.token != null) {
            return this.token != null;
        } else {
            return false;
        }
    }

    getName() {
        return this.name;
    }

    getUsername() {
        return this.username;
    }

    getUserIdNumber() { 
        return this.userIdNumber;
    }

    getEmail() {
        return this.email;
    }
}