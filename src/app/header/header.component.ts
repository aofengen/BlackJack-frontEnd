import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  constructor(private ms: NgbModal, private as: AuthService, private router: Router) { }

    token: string;
    name: string;
    userIdNumber: number;

  ngOnInit() {}

  ngAfterContentChecked() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
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
    this.token = null;
    this.name = null;
    this.userIdNumber = null;
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }
}
