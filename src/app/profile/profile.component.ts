import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public as: AuthService) { }
  loggedIn = false;
  name: string;

  ngOnInit() {
    this.loggedIn = this.as.isAuthenticated();
    this.name = this.as.getName();
  }

}
