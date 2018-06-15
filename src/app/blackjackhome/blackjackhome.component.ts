import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';;

@Component({
  selector: 'app-home',
  templateUrl: './blackjackhome.component.html',
  styleUrls: ['./blackjackhome.component.css']
})
export class BlackjackHomeComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  goToPoker = false;

  ngOnInit() { 
    if (localStorage.getItem('blackjack') != null) {
      this.router.navigate['/blackjack/game'];
    }
  }

  pageChecked(x) {
    this.as.pageClicked(x);
  }

}
