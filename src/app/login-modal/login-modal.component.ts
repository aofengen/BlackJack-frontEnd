import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(public as: AuthService, public activeModal: NgbActiveModal) { }

    loggedIn = false;
    name: string;
    
  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (email.trim()==="" || password.trim()==="") {
      alert("Please enter all fields!");
    } else {
      this.as.loginUser(email, password);
      localStorage.setItem("money", "0");
  	  this.activeModal.close('Close click');
    }
  }
}
