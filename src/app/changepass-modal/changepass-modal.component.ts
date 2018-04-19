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

  ngOnInit() {}

  onSubmit(form: NgForm) {
    let oldPass = form.value.oldPass;
    let newPass = form.value.newPass;
    let confirmPass = form.value.confirmPass;
    if(newPass != confirmPass) {
      alert("New Password and Confirm Password do not match!");
    } else {
      this.as.changeUserPassword(oldPass, newPass, confirmPass);
    }

  }

}
