import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  constructor(public as: AuthService, public activeModal: NgbActiveModal, private router: Router) { }

  loggedIn = false;
  name: string;

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const name = form.value.studentName;
    const email = form.value.email;
    const username = form.value.username;
    const password = form.value.password;
    //form.value.xxxxx pulls the information out of the form
    
    if (name === "" || email.trim()==="" || username==="" || password.trim()===""){
      //form validation to require no form is null
      alert("Please enter all fields!");
    } else {
      this.as.newUser(name, email, username, password);
      //access newUser function from AuthService file using parameters in parens
      this.activeModal.close('Close click');
    }
  }

}
