import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmpassModalComponent } from '../confirmpass-modal/confirmpass-modal.component';
import { ChangepassModalComponent } from '../changepass-modal/changepass-modal.component';

import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public as: AuthService, public ms: NgbModal) { }
  loggedIn = false;
  name: string;
  username: string;
  email: string;

  ngOnInit() {
    this.loggedIn = this.as.isAuthenticated();

    $('#name').val(this.as.getName());
    $('#username').val(this.as.getUsername());
    $('#email').val(this.as.getEmail());
  }

  changeInfo() {
    this.ms.open(ConfirmpassModalComponent);
  }

  changePassword() {
    this.ms.open(ChangepassModalComponent);
  }

}
