import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input('hand') cards = [];
  @Input('game') game: string;
  @Input('bsclass') bsclass: string;


  constructor() { }

  ngOnInit() {
    console.log(this.game);
  }


}
