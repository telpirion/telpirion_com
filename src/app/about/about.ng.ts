import { Component } from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'about',
  templateUrl: './about.ng.html',
  styleUrls: ['./about.ng.css']
})
export class AboutComponent {
  title: string = 'About';
  content: string = 'Find general information about the games and apps on this site.';
}