import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'home',
  templateUrl: './home.ng.html',
  styleUrls: ['./home.ng.css']
})
export class HomeComponent {
  title = 'Eric\'s awesome Angular site';
}