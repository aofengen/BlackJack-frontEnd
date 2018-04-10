import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

    loggedIn = false;
    userIdNumber: number;

  ngOnInit() {
  }

  signup() {
    this.loggedIn = true;
    this.userIdNumber = 1;
  }

  login() {
    this.loggedIn = true;
    this.userIdNumber = 1;
  }

  logout() {
    this.loggedIn = false;
  }
}
