import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-changepass-modal',
  templateUrl: './changepass-modal.component.html',
  styleUrls: ['./changepass-modal.component.css']
})
export class ChangepassModalComponent implements OnInit{

  constructor(private as: AuthService, private activeModal: NgbActiveModal) { }

  name: string;
  username: string;
  email: string;

  ngOnInit() {
    this.name = this.as.getName();
    this.username = this.as.getUsername();
    this.email = this.as.getEmail();
    console.log(this.name + " " + this.username + " " + this.email);

    $('#name').val(this.name);
    $('#username').val(this.username);
    $('#email').val(this.email);
  }

  onSubmit(form: NgForm) {
    let newName = form.value.name;
    let newUsername = form.value.username;
    let newEmail = form.value.email;
    let pass = form.value.password;

    this.as.changeUserInfo(newName, newUsername, newEmail, pass);
  }

}
