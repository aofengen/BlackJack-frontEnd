import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';
import { BlackjackService } from '../services/blackjack.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  constructor(private ms: NgbModal, private as: AuthService, private router: Router, private ac: ActivatedRoute, private gs: BlackjackService) { }

    token: string;
    name: string;
    userIdNumber: number;

  ngOnInit() {}

  ngAfterContentChecked() {
    if (localStorage.getItem("token")) {
      this.as.token = localStorage.getItem("token");
      this.userIdNumber = this.as.getUserIdNumber();
      this.name = this.as.getName();
    }

  }

  signup() {
    this.ms.open(SignupModalComponent);
  }

  login() {
    this.ms.open(LoginModalComponent);
  }

  logout() {
    this.as.token = null;
    this.name = null;
    this.userIdNumber = null;
    if (localStorage.getItem("statsSaved") == "no" && Number(localStorage.getItem("handsPlayed")) > 0) {
      this.gs.saveStats();      
    }
    localStorage.clear();
    this.router.navigate(['/']);
  }

  pageClicked(x) {
    this.as.pageClicked(x);
  }
}
