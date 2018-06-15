import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private ms: NgbModal, private as: AuthService) { }

  ngOnInit() {
    this.reload();
  }

  signup() {
    this.ms.open(SignupModalComponent);
  }

  login() {
    this.ms.open(LoginModalComponent);
  }

  reload() {
    this.as.token = null;
    localStorage.clear();
  }

}
