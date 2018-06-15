import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videopokerhome',
  templateUrl: './videopokerhome.component.html',
  styleUrls: ['./videopokerhome.component.css']
})
export class VideopokerHomeComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("poker") != null) {
      this.router.navigate['/poker/game'];
    }
  }

  pageChecked(x) {
    this.as.pageClicked(x);
  }

}
