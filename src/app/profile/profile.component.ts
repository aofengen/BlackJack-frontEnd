import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public as: AuthService) { }
  loggedIn = false;
  name: string;
  username: string;
  email: string;

  ngOnInit() {
    this.loggedIn = this.as.isAuthenticated();
    this.name = this.as.getName();
    this.username = this.as.getUsername();
    this.email = this.as.getEmail();

    $('#name').val(this.name);
    $('#username').val(this.username);
    $('#email').val(this.email);
  }

  changeName() {
    alert("Under Construction");
  }

  changeUsername() {
    alert("Under Construction");
  }

  changeEmail() {
    alert("Under Construction");
  }

  changePassword() {
    alert("Under Construction");
  }

}
