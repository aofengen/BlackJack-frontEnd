import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-confirmpass-modal',
  templateUrl: './confirmpass-modal.component.html',
  styleUrls: ['./confirmpass-modal.component.css']
})
export class ConfirmpassModalComponent implements OnInit {

  constructor(private as: AuthService, private activeModal: NgbActiveModal) { }

  name: string;
  username: string;
  email: string;

  ngOnInit() {}

  onSubmit(form: NgForm) {
    let newName = form.value.name;
    let newUsername = form.value.username;
    let newEmail = form.value.email;
    let pass = form.value.password;

    if (newName.trim() === "") newName = this.as.getName();
    if (newUsername.trim() === "") newUsername = this.as.getUsername();

    this.as.changeUserInfo(newName, newUsername, newEmail, pass);
    this.activeModal.close('Close click'); 
  }

}
