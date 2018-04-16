import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ms: NgbModal) { }

    loggedIn = false;
    userIdNumber: number;

  ngOnInit() {
  }

  signup() {
    this.ms.open(SignupModalComponent);
  }

  login() {
    this.loggedIn = true;
    this.ms.open(LoginModalComponent);
  }

  logout() {
    this.loggedIn = false;
  }
}
