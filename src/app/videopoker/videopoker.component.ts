import { Component, OnInit } from '@angular/core';
import { VideopokerService } from '../services/videopoker.service';

@Component({
  selector: 'app-videopoker',
  templateUrl: './videopoker.component.html',
  styleUrls: ['./videopoker.component.css']
})
export class VideopokerComponent implements OnInit {

  constructor(private vs: VideopokerService) { }

  ngOnInit() {
    this.vs.getMainDeck();
  }

}
