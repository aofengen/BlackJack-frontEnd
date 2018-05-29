import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-videopokerhome',
  templateUrl: './videopokerhome.component.html',
  styleUrls: ['./videopokerhome.component.css']
})
export class VideopokerHomeComponent implements OnInit {

  constructor(private as: AuthService) { }

  ngOnInit() {
  }

  pageChecked(x) {
    this.as.pageClicked(x);
  }

}
